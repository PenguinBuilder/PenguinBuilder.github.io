const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./render.js","./zues.js","./jsquery.js"])))=>i.map(i=>d[i]);
import{t as F}from"./theme-selector.js";import{$ as h}from"./jsquery.js";const _="modulepreload",S=function(e,t){return new URL(e,t).href},v={},k=function(t,o,s){let r=Promise.resolve();if(o&&o.length>0){let C=function(n){return Promise.all(n.map(a=>Promise.resolve(a).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};const c=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),E=i?.nonce||i?.getAttribute("nonce");r=C(o.map(n=>{if(n=S(n,s),n in v)return;v[n]=!0;const a=n.endsWith(".css"),p=a?'[rel="stylesheet"]':"";if(s)for(let f=c.length-1;f>=0;f--){const g=c[f];if(g.href===n&&(!a||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${p}`))return;const l=document.createElement("link");if(l.rel=a?"stylesheet":_,a||(l.as="script"),l.crossOrigin="",l.href=n,E&&l.setAttribute("nonce",E),document.head.appendChild(l),a)return new Promise((f,g)=>{l.addEventListener("load",f),l.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${n}`)))})}))}function m(c){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=c,window.dispatchEvent(i),!i.defaultPrevented)throw c}return r.then(c=>{for(const i of c||[])i.status==="rejected"&&m(i.reason);return t().catch(m)})},P=`<section>
<h1>[#6C9ACE] Block</h1>
<hr>
<p><img src="./images/workspace.json" alt=""></p>
<pre class="hljs"><code><span class="hljs-keyword">function</span> <span class="hljs-title function_">main</span>(<span class="hljs-params"></span>): <span class="hljs-built_in">string</span> {
hello
}
</code><sl-copy-button value="function main(): string {
hello
}
" class="code-copy-button"></sl-copy-button></pre>
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
`;F();const $=await k(()=>import("./render.js"),__vite__mapDeps([0,1,2]),import.meta.url),w={};await Promise.all(Object.entries(Object.assign({"./images/workspace.json":()=>k(()=>import("./workspace.js"),[],import.meta.url)})).map(async([e,t])=>w[e]=(await t()).default));const d=h("#content");d.html(P);d.all("img").forEach(async e=>{const t=e.getProp("src");if(t.startsWith("./images/")){if(t.endsWith(".json")){$.registerElt(e,await(await fetch(w[t])).json());return}e.props({src:w[t]})}});const u=h("#toc"),x=h.all("#content>section");function A(e,t,o){return h.create("div").child([h.create("div").css({"border-radius":"100%",background:e,width:"20px",height:"20px"}).class("circ"),h.create("div").css({fontSize:"16px",background:"#00000000"}).text(t)]).css({display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"5px",padding:"5px"}).click(()=>{b(o)}).props({for:o})}x.forEach(e=>{const t=e.$("h1").text().match(/^\[(#[0-9a-fA-F]{6})\]\s*(.+)/);if(!t)return;const o=t[1],s=t[2];e.id(s.toLowerCase().trim().replaceAll(/[^a-z0-9]/g,"-")),e.$("h1").text(s);const r=A(o,s,e.id());u.child(r)});let y=!1;function b(e){history.pushState(null,"","#"+e);const t=h("#"+e);t&&(u.all("[selected]").props({selected:null}),u.$(`[for=${e}]`).props({selected:""}),y=!0,t.elt.scrollIntoView({behavior:"smooth"}))}requestAnimationFrame(()=>{const e=location.hash.slice(1);e?b(e):u.children.length>0&&b(u.children[0].getProp("for"))});d.on("scrollend",()=>{y=!1});let j=0;d.on("scroll",()=>{if(y)return;const e=d.elt.scrollTop,t=d.children,o=e>j;for(const s of t){const r=s.rect(),m=r.top>=0&&r.top<window.innerHeight,c=r.bottom>0&&r.bottom<=window.innerHeight;if(o?m:c){u.all("[selected]").props({selected:null}),u.$(`[for=${s.id()}]`).props({selected:""}),history.pushState(null,"","#"+s.id());break}j=e}});
