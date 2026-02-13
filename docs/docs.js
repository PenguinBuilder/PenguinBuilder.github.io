import{t as u,$ as o}from"./theme-selector.js";const g=`<section>
<h1>[#6C9ACE] Block</h1>
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
`;u();const d={};await Promise.all(Object.entries(Object.assign({})).map(async([t,n])=>d[t]=(await n()).default));const i=o("#content");i.html(g);i.all("img").forEach(t=>{const n=t.getProp("src");n.startsWith("./images/")&&t.props({src:d[n]})});const s=o("#toc"),m=o.all("#content>section");function F(t,n,c){return o.create("div").child([o.create("div").css({"border-radius":"100%",background:t,width:"20px",height:"20px"}).class("circ"),o.create("div").css({fontSize:"16px",background:"#00000000"}).text(n)]).css({display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"5px",padding:"5px"}).click(()=>{l(c)}).props({for:c})}m.forEach(t=>{const n=t.$("h1").text().match(/^\[(#[0-9a-fA-F]{6})\]\s*(.+)/);if(!n)return;const c=n[1],e=n[2];t.id(e.toLowerCase().trim().replaceAll(/[^a-z0-9]/g,"-")),t.$("h1").text(e);const r=F(c,e,t.id());s.child(r)});let h=!1;function l(t){history.pushState(null,"","#"+t);const n=o("#"+t);n&&(s.all("[selected]").props({selected:null}),s.$(`[for=${t}]`).props({selected:""}),h=!0,n.elt.scrollIntoView({behavior:"smooth"}))}requestAnimationFrame(()=>{const t=location.hash.slice(1);t?l(t):s.children.length>0&&l(s.children[0].getProp("for"))});i.on("scrollend",()=>{h=!1});let a=0;i.on("scroll",()=>{if(h)return;const t=i.elt.scrollTop,n=i.children,c=t>a;for(const e of n){const r=e.rect(),p=r.top>=0&&r.top<window.innerHeight,f=r.bottom>0&&r.bottom<=window.innerHeight;if(c?p:f){s.all("[selected]").props({selected:null}),s.$(`[for=${e.id()}]`).props({selected:""}),history.pushState(null,"","#"+e.id());break}a=t}});
