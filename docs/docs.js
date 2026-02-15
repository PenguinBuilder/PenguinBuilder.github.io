const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./render.js","./zues.js","./jsquery.js"])))=>i.map(i=>d[i]);
import{t as E}from"./theme-selector.js";import{$ as u}from"./jsquery.js";const v="modulepreload",D=function(e,t){return new URL(e,t).href},A={},f=function(t,o,i){let r=Promise.resolve();if(o&&o.length>0){let I=function(n){return Promise.all(n.map(a=>Promise.resolve(a).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};const s=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),w=l?.nonce||l?.getAttribute("nonce");r=I(o.map(n=>{if(n=D(n,i),n in A)return;A[n]=!0;const a=n.endsWith(".css"),p=a?'[rel="stylesheet"]':"";if(i)for(let d=s.length-1;d>=0;d--){const b=s[d];if(b.href===n&&(!a||b.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${p}`))return;const c=document.createElement("link");if(c.rel=a?"stylesheet":v,a||(c.as="script"),c.crossOrigin="",c.href=n,w&&c.setAttribute("nonce",w),document.head.appendChild(c),a)return new Promise((d,b)=>{c.addEventListener("load",d),c.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${n}`)))})}))}function g(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&g(l.reason);return t().catch(g)})},x=`<section>
<h1>[#6C9ACE] Block</h1>
<hr>
<section>
<h2>Create Block</h2>
<p>creates a block in your extension<br>
<img src="./images/create_block.json" alt="create block"></p>
<section>
<h3>Arguments</h3>
<ul>
<li>ID: the ID that the block goes by, <strong>make sure the id is unique to other blocks</strong></li>
<li>Text: the display name of the block, put any inputs in brackets image of block</li>
<li>Show monitor: a boolean value representing weather to show the scratch monitor(wont work unless block is a reporter)</li>
<li>type: the type of block you want to make
<ul>
<li>block: a block that doesn't</li>
<li>reporter: a block that returns a value</li>
<li>boolean: a block that returns a boolean</li>
</ul>
</li>
<li>Inputs: an area to put inputs for the block, accepts
<ul>
<li>Create Input</li>
<li>Create Input Menu</li>
<li>Create Input From Menu</li>
</ul>
</li>
<li>function: the input to run the function that the block will run</li>
</ul>
<hr>
</section>
</section>
<section>
<h2>Create Input</h2>
<p>Creates an input of a specific type, which does not include menus</p>
<section>
<h3>Arguments</h3>
<ul>
<li>ID: the ID of the Input(make sure the id is unique to other inputs)</li>
<li>type: the type of the value excepted
<ul>
<li>string</li>
<li>number</li>
<li>boolean</li>
<li>empty: a type that forces you to use a variable</li>
<li>color</li>
<li>costume</li>
<li>sound</li>
<li>angle</li>
<li>note</li>
<li>matrix</li>
</ul>
</li>
<li>default text: the default value of the input(if the type supports it)</li>
</ul>
<hr>
</section>
</section>
<section>
<h2>Create Input Menu</h2>
<p>Creates a Menu<br>
<img src="./images/create_input_menu.json" alt="create input menu"></p>
<section>
<h3>Arguments</h3>
<ul>
<li>ID: the ID of the input(make sure the id is unique to other inputs)</li>
<li>Accept Reporters: a boolean on weather the input allows Reporters</li>
<li>Menu: An Array that represents the menu(Accepts a string or a menu item)</li>
</ul>
<hr>
</section>
</section>
<section>
<h2>Create Menu</h2>
<p>like &quot;Create Input Menu&quot;, this block will create a menu, but it can be used more than once<br>
<img src="./images/create_menu.json" alt="create menu"></p>
<section>
<h3>Arguments</h3>
<ul>
<li>ID: the ID of the menu(make sure the id is unique to other menus)</li>
<li>Accept Reporters: a boolean on weather the input allows Reporters</li>
<li>Menu: An Array that represents the menu(Accepts a string or a menu item) image of block</li>
</ul>
<hr>
</section>
</section>
<section>
<h2>Create Dynamic Menu</h2>
<p>create a menu similar to &quot;Create Menu&quot; but its dynamic<br>
<img src="./images/create_dynamic_menu.json" alt="create dynamic menu"></p>
<section>
<h3>Arguments</h3>
<ul>
<li>ID: the ID of the menu(make sure the id is unique to other menus)</li>
<li>Accept Reporters: a boolean on weather the input allows Reporters</li>
<li>Function: a statement for the menu(make sure it returns an array) image of block</li>
</ul>
<hr>
</section>
</section>
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
`;E();const F=await f(()=>import("./render.js"),__vite__mapDeps([0,1,2]),import.meta.url),k={};await Promise.all(Object.entries(Object.assign({"./images/create_block.json":()=>f(()=>import("./create_block.js"),[],import.meta.url),"./images/create_dynamic_menu.json":()=>f(()=>import("./create_dynamic_menu.js"),[],import.meta.url),"./images/create_input_menu.json":()=>f(()=>import("./create_input_menu.js"),[],import.meta.url),"./images/create_menu.json":()=>f(()=>import("./create_menu.js"),[],import.meta.url)})).map(async([e,t])=>k[e]=(await t()).default));const m=u("#content");m.html(x);m.all("img").forEach(async e=>{const t=e.getProp("src");if(t.startsWith("./images/")){if(t.endsWith(".json")){F.registerElt(e,await(await fetch(k[t])).json());return}e.props({src:k[t]})}});const h=u("#toc"),j=u.all("#content>section");function P(e,t,o){return u.create("div").child([u.create("div").css({"border-radius":"100%",background:e,width:"20px",height:"20px"}).class("circ"),u.create("div").css({fontSize:"16px",background:"#00000000"}).text(t)]).css({display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"5px",padding:"5px"}).click(()=>{_(o)}).props({for:o})}j.forEach(e=>{const t=e.$("h1").text().match(/^\[(#[0-9a-fA-F]{6})\]\s*(.+)/);if(!t)return;const o=t[1],i=t[2];e.id(i.toLowerCase().trim().replaceAll(/[^a-z0-9]/g,"-")),e.$("h1").text(i);const r=P(o,i,e.id());h.child(r)});let y=!1;function _(e){history.pushState(null,"","#"+e);const t=u("#"+e);t&&(h.all("[selected]").props({selected:null}),h.$(`[for=${e}]`).props({selected:""}),y=!0,t.elt.scrollIntoView({behavior:"smooth"}))}requestAnimationFrame(()=>{const e=location.hash.slice(1);e?_(e):h.children.length>0&&_(h.children[0].getProp("for"))});m.on("scrollend",()=>{y=!1});let C=0;m.on("scroll",()=>{if(y)return;const e=m.elt.scrollTop,t=m.children,o=e>C;for(const i of t){const r=i.rect(),g=r.top>=0&&r.top<window.innerHeight,s=r.bottom>0&&r.bottom<=window.innerHeight;if(o?g:s){h.all("[selected]").props({selected:null}),h.$(`[for=${i.id()}]`).props({selected:""}),history.pushState(null,"","#"+i.id());break}C=e}});
