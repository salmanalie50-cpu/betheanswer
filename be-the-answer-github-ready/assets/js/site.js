try{
(function(){var WA='923188398446',EM='salmanalie50@gmail.com',Q=[["One-line clarity", "Write one line: what you do, for whom, with what result."], ["Logo and style guide", "Create a logo and a simple style guide (colours, fonts, tone)."], ["Consistent look", "Use the same logo, colours and tone on every platform."], ["Visible prices", "Show starting prices or packages instead of \u201cDM for price\u201d."], ["Proof online", "Add real photos, reviews and results."], ["Weekly content", "Plan a weekly posting rhythm."], ["Fast replies", "Reply to every enquiry within 1 hour."], ["Known best channel", "Track which channel brings customers, then focus on it."]];
function $(s){return document.querySelector(s)||document.createElement('i')}
function tab(t){document.querySelectorAll('.tabs button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.t===t)});$('#p-brand').hidden=t!=='brand';$('#p-req').hidden=t==='brand';window.AT=t}
document.querySelectorAll('.tabs button').forEach(function(b){b.onclick=function(){tab(b.dataset.t)}});
document.querySelectorAll('[data-a]').forEach(function(a){a.addEventListener('click',function(){tab(a.dataset.a)})});
$('#runb').onclick=function(){var v=[].map.call(document.querySelectorAll('.qa select'),function(s){return +s.value}),sc=Math.round(v.reduce(function(a,b){return a+b},0)/(v.length*2)*100),col=sc>=75?'#2ED47A':sc>=50?'#FFC93C':'#D92B45';
var rows=Q.map(function(q,i){var s=v[i]===2?'pass':v[i]===1?'warn':'fail',c={pass:'#2ED47A',warn:'#FFC93C',fail:'#D92B45'}[s];return {s:v[i],h:'<div class="cr"><span class="dot" style="background:'+c+'">'+(s==='pass'?'✓':s==='warn'?'!':'✕')+'</span><div><b>'+q[0]+'</b><p class="mist s14">'+(v[i]===2?'Looking good.':q[1])+'</p></div></div>'}}).sort(function(a,b){return a.s-b.s});
$('#out').innerHTML='<div style="display:flex;gap:22px;align-items:center;flex-wrap:wrap;margin:28px 0 8px"><div class="sc2"><svg viewBox="0 0 150 150" class="ring"><circle class="bg" cx="75" cy="75" r="62"/><circle class="fg" id="fg" cx="75" cy="75" r="62" stroke="'+col+'" stroke-dasharray="390" stroke-dashoffset="390"/></svg><span>'+sc+'</span></div><div><span class="lb">Your brand score</span><h3 style="font-size:26px">'+(sc>=75?'Strong foundation':sc>=50?'Room to grow':'Needs attention')+'</h3></div></div>'+rows.map(function(r){return r.h}).join('')+'<div class="cta"><a class="btn" href="#contact">Get these fixed →</a></div>';setTimeout(function(){var f=$('#fg');if(f)f.style.strokeDashoffset=390*(1-sc/100)},50);$('#out').scrollIntoView({behavior:'smooth',block:'nearest'})};
function aurl(){var t={web:'website',design:'design',seo:'SEO'}[window.AT||'web'],m='Hi, I’d like a free '+t+' audit. Website: '+($('#au').value||'[link]')+'. Name: '+($('#an').value||'[name]')+'.';$('#awa').href='https://wa.me/'+WA+'?text='+encodeURIComponent(m);$('#aem').href='mailto:'+EM+'?subject='+encodeURIComponent('Free '+t+' audit')+'&body='+encodeURIComponent(m)}
['#au','#an'].forEach(function(s){$(s).addEventListener('input',aurl)});aurl();document.querySelectorAll('.tabs button').forEach(function(b){b.addEventListener('click',aurl)});
function msg(){var d=Object.fromEntries(new FormData($('#lf')).entries());return 'New enquiry%0A'.replace('%0A','\n')+['name','business','phone','email','website','service','budget','message'].map(function(k){return k+': '+(d[k]||'-')}).join('\n')}
$('#lf').addEventListener('submit',function(e){e.preventDefault();window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg()),'_blank')});
$('#lem').addEventListener('click',function(){this.href='mailto:'+EM+'?subject='+encodeURIComponent('Free audit request')+'&body='+encodeURIComponent(msg())});
})();
}catch(e){console.warn(e)}
try{
(function(){document.documentElement.classList.add('js');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);var d=e.target.querySelector('.da');if(d)d.querySelectorAll('b').forEach(function(b){b.style.width=b.dataset.w+'%'})}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(n){io.observe(n)});
document.querySelectorAll('[data-count]').forEach(function(n){var t=+n.dataset.count,p=n.dataset.p||'',s=0,st=performance.now();function f(now){var k=Math.min((now-st)/1200,1);n.textContent=p+Math.round(t*k)+(n.dataset.s||'');if(k<1)requestAnimationFrame(f)}requestAnimationFrame(f)});
var cb=document.querySelectorAll('.chips button');cb.forEach(function(b){b.onclick=function(){cb.forEach(function(x){x.setAttribute('aria-pressed',x===b)});document.querySelectorAll('#wl [data-c]').forEach(function(c){c.style.display=(b.dataset.f==='all'||c.dataset.c.toLowerCase().indexOf(b.dataset.f)>-1)?'':'none'})}});
})();
}catch(e){console.warn(e)}
try{
(function(){
var $=function(s){return document.querySelector(s)||document.createElement('i')};
if(matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('rm');$('#pre').remove();return;}
var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
function split(el){var i=0;el.setAttribute('aria-label',el.textContent.trim());function walk(n){[].slice.call(n.childNodes).forEach(function(c){if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(t){if(!t)return;if(/^\s+$/.test(t)){f.appendChild(document.createTextNode(' '));return}var w=document.createElement('span');w.className='wd';w.setAttribute('aria-hidden','true');var s=document.createElement('span');s.textContent=t;s.style.transitionDelay=(i++*70)+'ms';w.appendChild(s);f.appendChild(w)});n.replaceChild(f,c)}else if(c.nodeType===1)walk(c)})}walk(el);el.classList.add('sp')}
var hs=[].slice.call(document.querySelectorAll('h1,h2'));hs.forEach(split);
var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io2.unobserve(e.target)}})},{threshold:.3});
hs.forEach(function(h){if(h.closest('.hero'))setTimeout(function(){h.classList.add('in')},1700);else io2.observe(h)});
document.querySelectorAll('.grid,.steps,.stats,.split').forEach(function(g){[].slice.call(g.children).forEach(function(c,i){c.style.transitionDelay=(i*90)+'ms'})});
var sp=$('#sp'),pl=[].slice.call(document.querySelectorAll('.pl')),HS=[].slice.call(document.querySelectorAll('.hs')),mq=$('.mq'),last=scrollY,sk=0,tk=0;
function size(){HS.forEach(function(s){var t=s.querySelector('.track');s.style.height=(innerHeight+Math.max(0,t.scrollWidth-innerWidth))+'px'})}
function frame(){var y=scrollY,h=document.documentElement.scrollHeight-innerHeight,T=innerHeight+200;
 sp.style.transform='scaleX('+(h>0?y/h:0)+')';
 pl.forEach(function(e){var s=+e.dataset.s,o=+e.dataset.o*T,v=(((o-y*s)%T)+T)%T-100;e.style.transform='translate3d(0,'+v+'px,0) rotate('+(y*s*.25)+'deg)'});
 HS.forEach(function(s){var t=s.querySelector('.track'),b=s.querySelector('.hsb i'),r=s.getBoundingClientRect(),tot=s.offsetHeight-innerHeight,p=tot>0?Math.min(Math.max(-r.top/tot,0),1):0,mx=Math.max(0,t.scrollWidth-innerWidth);t.style.transform='translate3d('+(-p*mx)+'px,0,0)';b.style.transform='scaleX('+p+')'});
 var v=y-last;last=y;tk+=(Math.max(-12,Math.min(12,v*-.35))-tk)*.15;if(mq)mq.style.transform='skewX('+tk+'deg)';
 requestAnimationFrame(frame)}
size();addEventListener('resize',size);addEventListener('load',size);requestAnimationFrame(frame);
if(fine){document.body.classList.add('cc');var cd=$('#cd'),cr=$('#cr'),x=-100,y=-100,rx=-100,ry=-100,tx=0,ty=0,cx=0,cy=0,vis=$('.vis');
 addEventListener('mousemove',function(e){x=e.clientX;y=e.clientY;tx=x/innerWidth-.5;ty=y/innerHeight-.5;cd.style.transform='translate('+x+'px,'+y+'px)'});
 (function l(t){rx+=(x-rx)*.18;ry+=(y-ry)*.18;cr.style.transform='translate('+rx+'px,'+ry+'px)';cx+=(tx-cx)*.06;cy+=(ty-cy)*.06;if(vis)vis.style.transform='perspective(900px) rotateY('+(cx*18)+'deg) rotateX('+(-cy*14)+'deg) rotate(1.5deg) translateY('+Math.sin(t/900)*8+'px)';requestAnimationFrame(l)})(0);
 document.addEventListener('mouseover',function(e){cr.classList.toggle('big',!!e.target.closest('a,button,summary,.hv,.price'))});
 document.querySelectorAll('.btn,.ghost,.wa').forEach(function(b){b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();b.style.setProperty('--tx',((e.clientX-r.left-r.width/2)*.3)+'px');b.style.setProperty('--ty',((e.clientY-r.top-r.height/2)*.3)+'px')});b.addEventListener('mouseleave',function(){b.style.setProperty('--tx','0px');b.style.setProperty('--ty','0px')})});
 document.querySelectorAll('.hv,.price').forEach(function(c){c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;c.style.transition='transform .08s';c.style.transform='perspective(800px) rotateX('+((.5-py)*9)+'deg) rotateY('+((px-.5)*11)+'deg) translateY(-6px)';c.style.setProperty('--mx',px*100+'%');c.style.setProperty('--my',py*100+'%')});c.addEventListener('mouseleave',function(){c.style.transition='transform .5s';c.style.transform=''})})}
})();
}catch(e){console.warn(e)}