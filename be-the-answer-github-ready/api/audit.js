// Vercel Serverless Function: POST /api/audit
const { lookup } = require("node:dns/promises");
const net = require("node:net");
const hits = new Map();
function priv(ip) { return net.isIP(ip) === 4 ? /^(10\.|127\.|0\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(ip) : /^(::1|fc|fd|fe80)/i.test(ip); }
async function safeFetch(u) {
  const url = new URL(/^https?:\/\//i.test(u) ? u : "https://" + u);
  if (!/^https?:$/.test(url.protocol)) throw new Error("Invalid URL");
  const { address } = await lookup(url.hostname); if (priv(address)) throw new Error("This address can’t be audited.");
  const t0 = Date.now(), ac = new AbortController(), to = setTimeout(() => ac.abort(), 12000);
  const r = await fetch(url, { signal: ac.signal, redirect: "follow", headers: { "User-Agent": "BeTheAnswerAuditBot/1.0" } }); clearTimeout(to);
  const html = (await r.text()).slice(0, 1_500_000); return { url, html, ms: Date.now() - t0, status: r.status };
}
const m = (h, re) => (h.match(re) || [])[1]?.trim() || "";
const c = (label, ok, good, bad, w = 1) => ({ label, status: ok === true ? "pass" : ok === "warn" ? "warn" : "fail", tip: ok === true ? good : bad, w });
function analyse(type, h, url, ms) {
  const title = m(h, /<title[^>]*>([^<]*)/i), desc = m(h, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i) || m(h, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description/i);
  const h1 = (h.match(/<h1[\s>]/gi) || []).length, h2 = (h.match(/<h2[\s>]/gi) || []).length, imgs = h.match(/<img\b[^>]*>/gi) || [], noAlt = imgs.filter(i => !/\balt=["'][^"']+/i.test(i)).length;
  const viewport = /<meta[^>]+name=["']viewport/i.test(h), https = url.protocol === "https:", scripts = (h.match(/<script\b/gi) || []).length;
  const cta = /(book|contact|call|get started|get a quote|whatsapp|free audit|order now)/i.test(h), contact = /(tel:|mailto:|wa\.me|whatsapp)/i.test(h);
  const schema = /application\/ld\+json/i.test(h), canon = /rel=["']canonical/i.test(h), og = /property=["']og:title/i.test(h), noindex = /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(h);
  const lang = /<html[^>]+lang=/i.test(h), fav = /rel=["'][^"']*icon/i.test(h);
  const seo = [c("Title tag length (30–60 characters)", title.length >= 30 && title.length <= 65 ? true : title ? "warn" : false, "Your title is a good length.", title ? `Title is ${title.length} characters. Aim for 30–60 with your main service and city.` : "No title tag found."),
    c("Meta description (70–160)", desc.length >= 70 && desc.length <= 165 ? true : desc ? "warn" : false, "Description is present and well sized.", desc ? `Description is ${desc.length} characters. Rewrite it to 70–160 with a clear benefit.` : "No meta description. Add one so Google shows a strong snippet."),
    c("Exactly one H1 heading", h1 === 1, "One clear H1.", h1 === 0 ? "No H1. Add one headline with your main service." : `${h1} H1 tags. Use just one.`),
    c("Page can be indexed", !noindex, "No noindex block found.", "A noindex tag is blocking Google. Remove it.", 2),
    c("Canonical tag", canon, "Canonical set.", "Add a canonical tag to avoid duplicate-content issues."),
    c("Structured data (schema)", schema, "Schema found.", "No schema. Add LocalBusiness/Organization and FAQ schema to help Google and AI assistants understand you."),
    c("Social preview (Open Graph)", og, "Open Graph tags found.", "Add Open Graph tags so links look good when shared."),
    c("Images have alt text", imgs.length === 0 ? "warn" : noAlt === 0 ? true : noAlt / imgs.length < .3 ? "warn" : false, "All images have alt text.", imgs.length ? `${noAlt} of ${imgs.length} images miss alt text.` : "No images found. Real photos build trust."),
    c("Language declared", lang, "Language set.", "Add a lang attribute to the html tag.")];
  const web = [c("Uses HTTPS", https, "Secure connection.", "Site is not on HTTPS. Browsers warn visitors.", 2), c("Mobile viewport tag", viewport, "Mobile-ready viewport.", "No viewport tag. The site may look broken on phones.", 2),
    c("Server response time", ms < 1500 ? true : ms < 3000 ? "warn" : false, `Responded in ${ms} ms.`, `Responded in ${ms} ms. Slow servers lose visitors. Add caching and compress images.`),
    c("Script weight", scripts <= 15 ? true : scripts <= 30 ? "warn" : false, `${scripts} scripts.`, `${scripts} script tags. Remove heavy plugins and trackers.`),
    c("Contact options visible", contact, "Call, email or WhatsApp links found.", "No click-to-call, email or WhatsApp link found. Make it one tap to reach you.", 2),
    c("Clear call to action", cta, "Action words found.", "No clear call to action. Tell visitors the next step on every page.", 2), c("Favicon present", fav, "Favicon set.", "Add a favicon for a professional look.")];
  const des = [c("Mobile viewport", viewport, "Mobile-ready.", "Add a viewport tag so the layout adapts to phones.", 2), c("Clear call to action", cta, "CTA words found.", "Add a visible button like “Book a call” or “Get a quote”.", 2),
    c("Visible contact options", contact, "Contact links found.", "Add click-to-call and WhatsApp buttons."), c("Structured sections", h2 >= 3, `${h2} section headings.`, "Break content into clear sections with H2 headings."),
    c("One strong headline", h1 === 1, "One clear H1.", "Use one clear headline that says what you do and for whom."), c("Real images", imgs.length >= 3, `${imgs.length} images.`, "Add real photos and proof. Stock-only pages feel generic."),
    c("Images described", imgs.length === 0 ? "warn" : noAlt === 0, "Alt text present.", "Add alt text to images.")];
  return type === "seo" ? seo : type === "design" ? des : web.concat(seo.slice(0, 2));
}
const score = (cs) => { const t = cs.reduce((a, x) => a + x.w, 0); return Math.round(100 * cs.reduce((a, x) => a + x.w * (x.status === "pass" ? 1 : x.status === "warn" ? .5 : 0), 0) / t); };
async function ai(type, cs, sc) {
  const key = process.env.ANTHROPIC_API_KEY; if (!key) return undefined;
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" }, body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5", max_tokens: 700, messages: [{ role: "user", content: `You are a senior brand and SEO strategist. Audit type: ${type}. Score: ${sc}/100. Findings: ${JSON.stringify(cs.map(({ label, status, tip }) => ({ label, status, tip })))}. Reply ONLY with JSON: {"summary":"2 plain sentences","priorities":["3-5 short, specific actions in order"]}. Do not invent data.` }] }) });
    const j = await r.json(); const t = (j.content?.[0]?.text || "").replace(/```json|```/g, "").trim(); return JSON.parse(t);
  } catch { return undefined; }
}

function parse(b) { if (typeof b === "string") { try { return JSON.parse(b); } catch (e) { return {}; } } return b || {}; }
module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const ip = String(req.headers["x-forwarded-for"] || "x").split(",")[0].trim(), now = Date.now();
  const h = (hits.get(ip) || []).filter(t => now - t < 600000);
  if (h.length >= 8) return res.status(429).json({ error: "Too many audits. Try again in a few minutes." });
  hits.set(ip, [...h, now]);
  const b = parse(req.body); const type = ["brand", "website", "design", "seo"].includes(b.type) ? b.type : "website";
  try {
    let cs;
    if (type === "brand") {
      const QS = ["One-line clarity", "Logo and style guide", "Consistent look", "Visible prices or packages", "Proof online", "Weekly content", "Fast replies", "Known best channel"];
      const tips = ["Write one line: what you do, for whom, with what result.", "Create a logo and a simple style guide (colours, fonts, tone).", "Use the same logo, colours and tone on every platform.", "Show starting prices or packages instead of “DM for price”.", "Add real photos, reviews and results.", "Plan a weekly posting rhythm.", "Reply to every enquiry within 1 hour.", "Track which channel brings customers, then focus on it."];
      const a = Array.isArray(b.answers) ? b.answers : []; cs = QS.map((q, i) => ({ label: q, status: (a[i] === 2 ? "pass" : a[i] === 1 ? "warn" : "fail"), tip: a[i] === 2 ? "Looking good." : tips[i], w: 1 }));
    } else { const f = await safeFetch(String(b.url || "")); if (f.status >= 400) throw new Error(`The site returned error ${f.status}.`); cs = analyse(type, f.html, f.url, f.ms); }
    const sc = score(cs); const ana = await ai(type, cs, sc);
    return res.status(200).json({ score: sc, checks: cs.map(({ w, ...x }) => x).sort((x, y) => ["fail", "warn", "pass"].indexOf(x.status) - ["fail", "warn", "pass"].indexOf(y.status)), ai: ana });
  } catch (e) { return res.status(200).json({ score: 0, checks: [], error: e?.name === "AbortError" ? "The site took too long to respond." : e?.message || "Could not audit this site." }); }
};
