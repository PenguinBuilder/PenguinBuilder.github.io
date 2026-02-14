const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./render.js","./zues.js","./jsquery.js"])))=>i.map(i=>d[i]);
import{t as S}from"./theme-selector.js";import{$ as h}from"./jsquery.js";const P="modulepreload",_=function(e,t){return new URL(e,t).href},v={},F=function(t,o,s){let r=Promise.resolve();if(o&&o.length>0){let k=function(n){return Promise.all(n.map(a=>Promise.resolve(a).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const c=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),y=i?.nonce||i?.getAttribute("nonce");r=k(o.map(n=>{if(n=_(n,s),n in v)return;v[n]=!0;const a=n.endsWith(".css"),f=a?'[rel="stylesheet"]':"";if(s)for(let m=c.length-1;m>=0;m--){const g=c[m];if(g.href===n&&(!a||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${f}`))return;const l=document.createElement("link");if(l.rel=a?"stylesheet":P,a||(l.as="script"),l.crossOrigin="",l.href=n,y&&l.setAttribute("nonce",y),document.head.appendChild(l),a)return new Promise((m,g)=>{l.addEventListener("load",m),l.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${n}`)))})}))}function p(c){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=c,window.dispatchEvent(i),!i.defaultPrevented)throw c}return r.then(c=>{for(const i of c||[])i.status==="rejected"&&p(i.reason);return t().catch(p)})},$=`<section>
<h1>[#6C9ACE] Block</h1>
<hr>
<p><img src="./images/workspace.json" alt=""></p>
<hr>
</section>
<section>
<h1>[#8D46AC] Category</h1>
<hr>
</section>
<section>
<h1>[#D85450] JSON</h1>
<hr>
</section>
<section>
<h1>[#FF667F] Functions</h1>
<hr>
</section>
<section>
<h1>[#16BC8B] Controls</h1>
<hr>
</section>
<section>
<h1>[#4D96FF] Logic</h1>
<hr>
</section>
<section>
<h1>[#FF5827] Browser</h1>
<hr>
</section>
<section>
<h1>[#FF00FF] Advanced</h1>
<hr>
</section>
<section>
<h1>[#6C747C] Extensions</h1>
<hr>
</section>
`;S();const x=await F(()=>import("./render.js"),__vite__mapDeps([0,1,2]),import.meta.url),w={};await Promise.all(Object.entries(Object.assign({"./images/workspace.json":()=>F(()=>import("./workspace.js"),[],import.meta.url)})).map(async([e,t])=>w[e]=(await t()).default));const u=h("#content");u.html($);u.all("img").forEach(async e=>{const t=e.getProp("src");if(t.startsWith("./images/")){if(t.endsWith(".json")){x.registerElt(e,await(await fetch(w[t])).json());return}e.props({src:w[t]})}});const d=h("#toc"),A=h.all("#content>section");function j(e,t,o){return h.create("div").child([h.create("div").css({"border-radius":"100%",background:e,width:"20px",height:"20px"}).class("circ"),h.create("div").css({fontSize:"16px",background:"#00000000"}).text(t)]).css({display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"5px",padding:"5px"}).click(()=>{E(o)}).props({for:o})}A.forEach(e=>{const t=e.$("h1").text().match(/^\[(#[0-9a-fA-F]{6})\]\s*(.+)/);if(!t)return;const o=t[1],s=t[2];e.id(s.toLowerCase().trim().replaceAll(/[^a-z0-9]/g,"-")),e.$("h1").text(s);const r=j(o,s,e.id());d.child(r)});let b=!1;function E(e){history.pushState(null,"","#"+e);const t=h("#"+e);t&&(d.all("[selected]").props({selected:null}),d.$(`[for=${e}]`).props({selected:""}),b=!0,t.elt.scrollIntoView({behavior:"smooth"}))}requestAnimationFrame(()=>{const e=location.hash.slice(1);e?E(e):d.children.length>0&&E(d.children[0].getProp("for"))});u.on("scrollend",()=>{b=!1});let C=0;u.on("scroll",()=>{if(b)return;const e=u.elt.scrollTop,t=u.children,o=e>C;for(const s of t){const r=s.rect(),p=r.top>=0&&r.top<window.innerHeight,c=r.bottom>0&&r.bottom<=window.innerHeight;if(o?p:c){d.all("[selected]").props({selected:null}),d.$(`[for=${s.id()}]`).props({selected:""}),history.pushState(null,"","#"+s.id());break}C=e}});
