import{t as o}from"./theme-selector.js";import{_ as i}from"./preload-helper.js";import{$ as a}from"./jsquery.js";import{s as l}from"./style-selector.js";const r=`<section>
<h1>Version 4.1.0</h1>
<ul>
<li>added a button that lets you view and copy the code instead of just downloading it</li>
<li>fixed bug with updating extensions</li>
<li>added the ability for extensions to register types to output shapes</li>
<li>fixed an issue with how extensions are loaded</li>
<li>added an animation to the copy button</li>
<li>added another output shape that extensions can use</li>
</ul>
<section>
<h2>⚠️ Braking Changes</h2>
<ul>
<li>None 👍</li>
</ul>
</section>
</section>
<section>
<h1>Version 4.0.0</h1>
<ul>
<li>added blog page</li>
<li>redid the entire UI</li>
<li>added the ability to use the system theme instead of just light and dark</li>
<li>added the ability to change the block renderer at runtime and made the docs reflect the renderer you chose
<ul>
<li>Thrasos(what PenguinBuilder used to use in the first versions)<br>
<img src="./images/thrasos_example.svg" alt="Thrasos example"></li>
<li>Zelos(what PenguinBuilder eventually switched to using)<br>
<img src="./images/zelos_example.svg" alt="Zelos example"></li>
<li>Zeus(an extended version of Zelos that PenguinBuilder now uses, just adds new output shapes)<br>
<img src="./images/zeus_example.svg" alt="Zeus example"></li>
</ul>
</li>
<li>added the ability to export the workspace to svg and json, the json is primarily used for the docs, so that it can match the renderer that the user has set, and is not the same as the save file</li>
<li>change the save file format, which makes it not compatible with 3.x.x</li>
<li>made the extension api allow more stuff with colors</li>
<li>changed how the JSON blocks are handled</li>
<li>removed the function expression related blocks</li>
<li>removed the comment blocks</li>
</ul>
<section>
<h2>⚠️ Breaking Changes</h2>
<ul>
<li>the save format is not compatible with the older 3.x.x format</li>
</ul>
</section>
</section>
`;o();l();const n={};await Promise.all(Object.entries(Object.assign({"./images/thrasos_example.svg":()=>i(()=>import("./thrasos_example.js"),[],import.meta.url),"./images/zelos_example.svg":()=>i(()=>import("./zelos_example.js"),[],import.meta.url),"./images/zeus_example.svg":()=>i(()=>import("./zeus_example.js"),[],import.meta.url)})).map(async([e,t])=>n[e]=(await t()).default));const s=a("#content");s.html(r);s.all("img").forEach(async e=>{const t=e.getProp("src");t.startsWith("./images/")&&e.props({src:n[t]})});
