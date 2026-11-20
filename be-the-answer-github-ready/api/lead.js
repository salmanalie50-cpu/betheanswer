// Vercel Serverless Function: POST /api/lead
const hits = new Map();
const esc = (s) => String(s || "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const ip = String(req.headers["x-forwarded-for"] || "x").split(",")[0].trim(), now = Date.now();
  const h = (hits.get(ip) || []).filter((t) => now - t < 600000);
  if (h.length >= 5) return res.status(429).json({ error: "Too many requests" });
  hits.set(ip, [...h, now]);
  let d = req.body; if (typeof d === "string") { try { d = JSON.parse(d); } catch (e) { d = null; } }
  if (!d || d.company) return res.status(200).json({ ok: true });
  for (const k of ["name", "business", "phone", "email"]) if (!String(d[k] || "").trim()) return res.status(400).json({ error: "Missing " + k });
  if (!/^\S+@\S+\.\S+$/.test(d.email)) return res.status(400).json({ error: "Invalid email" });
  const html = Object.entries(d).filter(([k]) => k !== "company" && k !== "consent").map(([k, v]) => "<p><b>" + esc(k) + ":</b> " + esc(v) + "</p>").join("");
  const key = process.env.RESEND_API_KEY, to = process.env.LEAD_TO_EMAIL;
  if (!key || !to) return res.status(503).json({ error: "Email is not configured" });
  try {
    const r = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.LEAD_FROM_EMAIL || "Be The Answer <onboarding@resend.dev>", to: [to], reply_to: d.email, subject: "New lead: " + esc(d.business) + " (" + esc(d.service) + ")", html }) });
    if (!r.ok) return res.status(502).json({ error: "Could not send" });
    return res.status(200).json({ ok: true });
  } catch (e) { return res.status(502).json({ error: "Could not send" }); }
};
