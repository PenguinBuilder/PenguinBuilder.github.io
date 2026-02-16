const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./render.js","./save_svg.js","./jsquery.js","./style-selector.js"])))=>i.map(i=>d[i]);
import{t as f}from"./theme-selector.js";import{_ as e}from"./preload-helper.js";import{$ as o}from"./jsquery.js";const b=`<section>
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
<li>ID: the ID of the Input(make sure the id is <strong>unique</strong> to other inputs)</li>
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
<li>ID: the ID of the input(make sure the id is <strong>unique</strong> to other inputs)</li>
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
<li>ID: the ID of the menu(make sure the id is <strong>unique</strong> to other menus)</li>
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
<li>ID: the ID of the menu(make sure the id is <strong>unique</strong> to other menus)</li>
<li>Accept Reporters: a boolean on weather the input allows Reporters</li>
<li>Function: a statement for the menu(make sure it <strong>returns</strong> an array) image of block</li>
</ul>
<hr>
</section>
</section>
<section>
<h2>Create Input From Menu</h2>
<p>creates an input from a menu created will &quot;Create Menu&quot;<br>
<img src="./images/create_input_from_menu.json" alt="create input from menu"></p>
<section>
<h3>Arguments</h3>
<ul>
<li>ID: the ID of the input(make sure the id is <strong>unique</strong> to other inputs)</li>
<li>Menu ID: The ID of the menu you want to use(make sure the Menu ID is the same and the ID of the menu) image of block</li>
</ul>
<hr>
</section>
</section>
<section>
<h2>Menu Item</h2>
<p>creates a menu item returns: Object</p>
<section>
<h3>Arguments</h3>
<p>text: the text that the menu shows
value: the value the item returns when getting the Input</p>
<hr>
</section>
</section>
<section>
<h2>Get Input</h2>
<p>gets a value of an input and returns it</p>
<section>
<h3>Arguments</h3>
<p>Input ID: the ID of the input you want</p>
<hr>
</section>
</section>
<section>
<h2>Return</h2>
<p>returns from a block</p>
<section>
<h3>Arguments</h3>
<p>value: the return value</p>
<hr>
</section>
</section>
<section>
<h2>Create Hat</h2>
<p>creates a Hat Block<br>
<img src="./images/create_hat.json" alt="create hat"></p>
<section>
<h3>Arguments</h3>
<p>ID: the ID of the Hat(make sure the ID is <strong>unique</strong> to other Hats)
Text: the display name of the block, put any inputs in brackets image of block</p>
<hr>
</section>
</section>
<section>
<h2>Call Hat/ Call Hat With Args</h2>
<p>calls a hat block through the scratch vm(make sure the extension is unsandboxed)<br>
<img src="./images/call_hat.json" alt="call hat"></p>
<section>
<h3>Arguments</h3>
<p>ID: the ID of the Hat you want to call
Args(for Call Hat With Args only): an Object that represents the inputs in the hat
__</p>
</section>
</section>
</section>
<section>
<h1>[#8D46AC] Category</h1>
<hr>
<section>
<h2>Order Category</h2>
<p>only use one of these blocks in a project it will sort the category to be in any order you want<br>
<img src="./images/order_category.json" alt="order category"></p>
<hr>
</section>
<section>
<h2>Create Label</h2>
<p>creates a label in the position you want</p>
<section>
<h3>Arguments</h3>
<p>text: the text you want to show</p>
<hr>
</section>
</section>
<section>
<h2>Create Button</h2>
<p>creates a button in the position you want</p>
<section>
<h3>Arguments</h3>
<p>text: the text you want on the button
onlick: the function the button runs when you click it</p>
<hr>
</section>
</section>
<section>
<h2>Use Block</h2>
<p>puts a block in a location you want</p>
<section>
<h3>Arguments</h3>
<p>id: the id of the block</p>
<hr>
</section>
</section>
<section>
<h2>Use Hat</h2>
<p>puts a hat in a location you want</p>
<section>
<h3>Arguments</h3>
<p>id: the id of the hat</p>
<hr>
</section>
</section>
</section>
<section>
<h1>[#D85450] JSON</h1>
<hr>
<section>
<h2>JSON from / Empty JSON Object</h2>
<p>a mutator with key values pairs of JSON return <em>Object</em>
<img src="./images/JSON_from.json" alt="JSON from"></p>
<section>
<h3>Arguments</h3>
<ul>
<li>Key[n]: string for the key that it expects</li>
<li>Value[n]: the value for that key</li>
</ul>
<hr>
</section>
</section>
<section>
<h2>in JSON get</h2>
<p>gets a value of a JSON object <em>returns</em>: any</p>
<p>Arguments</p>
<ul>
<li>Object: the JSON Object you are getting from</li>
<li>key: the key to the value you want</li>
</ul>
<hr>
</section>
<section>
<h2>JSON set</h2>
<p>mutates an objects key to a new value</p>
<section>
<h3>Arguments</h3>
<ul>
<li>Object: the Object you are setting a value of</li>
<li>key: the key that your setting</li>
<li>value: the value your setting it to</li>
</ul>
<hr>
</section>
</section>
<section>
<h2>JSON parse\\stringify</h2>
<p>parses or stringifies an Object</p>
<section>
<h3>Arguments</h3>
<ul>
<li>Operation: a menu with 2 values
<ul>
<li>Parse: <strong>returns Object</strong>
takes a JSON string and turns it into an Object</li>
<li>stringify <strong>returns String</strong>
takes a JSON Object and turns it into a string</li>
</ul>
</li>
<li>Object: either a JSON string or an Object that you are stringifying</li>
</ul>
<hr>
</section>
</section>
<section>
<h2>Get from JSON</h2>
<p>gets the key, value, or entries of an Object, <strong>returns Array</strong></p>
<ul>
<li>type: a menu for what it fetches
<ul>
<li>Keys: <strong>returns the keys of the Object</strong></li>
<li>Values: <strong>returns the values of the Object</strong></li>
<li>Keys: <strong>returns the entries of the Object</strong> as an Array of an Array with the key and value</li>
</ul>
</li>
<li>Object: the object it gets it from</li>
</ul>
<hr>
</section>
<section>
<h2>Does Key exist in</h2>
<p>checks if a key exists in the object <strong>returns Boolean</strong></p>
<ul>
<li>Object: the object it checks</li>
</ul>
<hr>
</section>
</section>
<section>
<h1>[#FF667F] Functions</h1>
<p>__</p>
<section>
<h2>Function inline</h2>
<p>an inline function <strong>returns whatever the body returns</strong>
there are three types, 2 don't return, 1 does return</p>
<hr>
</section>
<section>
<h2>Return</h2>
<p>returns from an inline function</p>
<section>
<h3>Arguments</h3>
<p>value: the return value</p>
<hr>
</section>
</section>
</section>
<section>
<h1>[#16BC8B] Controls</h1>
<hr>
<section>
<h2>Wait</h2>
<p>waits a given amount of time</p>
<section>
<h3>Arguments</h3>
<ul>
<li>Time: the time it waits in milliseconds</li>
</ul>
<hr>
</section>
</section>
<section>
<h2>Wait Until</h2>
<p>waits until a boolean is true</p>
<section>
<h3>Arguments</h3>
<ul>
<li>Bool: the Boolean it waits for</li>
</ul>
<hr>
</section>
</section>
<section>
<h2>Try</h2>
<p>tries to run a code, and returns false if there's an error, returns true if there isn't</p>
<hr>
</section>
</section>
<section>
<h1>[#4D96FF] Logic</h1>
<hr>
<section>
<h2>Random</h2>
<p>returns a random bool, true or false</p>
<hr>
</section>
<section>
<h2>Switch</h2>
<p>runs code for the first value that matches, with fall-through<br>
to prevent fall-through, make sure to add break after each case<br>
<img src="./images/switch.json" alt="switch"></p>
<hr>
</section>
<section>
<h2>Switch Expression</h2>
<p>similar to switch, except it returns a value for the first case that matches the value, and you don't have to worry about fall-through</p>
<hr>
</section>
</section>
<section>
<h1>[#FF5827] Browser</h1>
<hr>
<section>
<h2>Console</h2>
<p>logs to the console with 4 possible levels</p>
<section>
<h3>Arguments</h3>
<ul>
<li>level
<ul>
<li>log</li>
<li>warn</li>
<li>error</li>
<li>info</li>
</ul>
</li>
<li>Value: the value to log</li>
</ul>
<hr>
</section>
</section>
<section>
<h2>Alert</h2>
<p>displays a message to the user</p>
<section>
<h3>Arguments</h3>
<ul>
<li>message: the message displayed to the user</li>
</ul>
<hr>
</section>
</section>
<section>
<h2>Confirm</h2>
<p>displays a message and has the user confirm or deny the message returns: boolean of the users input</p>
<section>
<h3>Arguments</h3>
<ul>
<li>message: the message displayed to the user</li>
</ul>
<hr>
</section>
</section>
<section>
<h2>Prompt</h2>
<p>displays a message as a prompt returns: text value of what the user put</p>
<section>
<h3>Arguments</h3>
<ul>
<li>message: the message displayed to the user</li>
</ul>
<hr>
</section>
</section>
</section>
<section>
<h1>[#FF00FF] Advanced</h1>
<hr>
<section>
<h2>Eval: 2 versions</h2>
<p>runs javascript there is a reporter version that returns the return value of the inputed code</p>
<section>
<h3>Arguments</h3>
<ul>
<li>value: the code to run</li>
</ul>
<hr>
</section>
</section>
<section>
<h2>Raw: 2 versions</h2>
<p>inserts raw javascript one returns the value of the inserted javascript</p>
<section>
<h3>Arguments</h3>
<p>value: the code to insert</p>
<hr>
</section>
</section>
</section>
<section>
<h1>[#6C747C] Extensions</h1>
<hr>
<section>
<h3>Creating Extensions</h3>
<p>copy the extensions.d.ts file from this <a href="https://github.com/PenguinBuilder/ExtensionGallery">GitHub</a> for type declarations of the api, either look at the example, or copy this for the example, using typescript is recommended, but if you use typescript, you have to compile it yourself</p>
<pre class="hljs"><code>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">class</span> <span class="hljs-title class_">Extension</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">PenguinExtension</span> {
    <span class="hljs-title class_">Info</span>() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Example&quot;</span>,
        <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;#0000FF&quot;</span>,
        <span class="hljs-attr">ID</span>: <span class="hljs-string">&quot;Example&quot;</span>,
        <span class="hljs-attr">blocks</span>: [
            {
                <span class="hljs-attr">opcode</span>: <span class="hljs-string">&quot;test&quot;</span>, <span class="hljs-comment">//should be unique, with no overlap with other opcodes</span>
                <span class="hljs-attr">color</span>: <span class="hljs-number">225</span>, <span class="hljs-comment">//optional color, can be a string, or number for a hex value</span>
                <span class="hljs-attr">blockType</span>: <span class="hljs-title class_">Penguin</span>.<span class="hljs-property">blockType</span>.<span class="hljs-title class_">Statement</span>(),
                <span class="hljs-attr">args</span>: [
                    <span class="hljs-title class_">Penguin</span>.<span class="hljs-property">Argument</span>.<span class="hljs-title class_">Dummy</span>([
                        <span class="hljs-title class_">Penguin</span>.<span class="hljs-property">Field</span>.<span class="hljs-title class_">Text</span>(<span class="hljs-string">&quot;test&quot;</span>),
                        <span class="hljs-title class_">Penguin</span>.<span class="hljs-property">Field</span>.<span class="hljs-title class_">TextInput</span>(<span class="hljs-string">&quot;test&quot;</span>, <span class="hljs-string">&quot;test&quot;</span>)
                    ])
                ]
            }
        ],
      };
    }
    generator = {
        <span class="hljs-title function_">test</span>(<span class="hljs-params"><span class="hljs-attr">block</span>: <span class="hljs-title class_">Block</span></span>) { <span class="hljs-comment">//the function name is the same as the opcode</span>
            <span class="hljs-keyword">return</span> <span class="hljs-string">\`//<span class="hljs-subst">\${block.getField(<span class="hljs-string">&quot;test&quot;</span>)}</span>\`</span>;
        }
    };
  }

  <span class="hljs-title class_">Penguin</span>.<span class="hljs-title class_">LoadExtension</span>(<span class="hljs-title class_">Extension</span>);
})();
</code><sl-copy-button value="(() => {
  class Extension implements PenguinExtension {
    Info() {
      return {
        name: &quot;Example&quot;,
        color: &quot;#0000FF&quot;,
        ID: &quot;Example&quot;,
        blocks: [
            {
                opcode: &quot;test&quot;, //should be unique, with no overlap with other opcodes
                color: 225, //optional color, can be a string, or number for a hex value
                blockType: Penguin.blockType.Statement(),
                args: [
                    Penguin.Argument.Dummy([
                        Penguin.Field.Text(&quot;test&quot;),
                        Penguin.Field.TextInput(&quot;test&quot;, &quot;test&quot;)
                    ])
                ]
            }
        ],
      };
    }
    generator = {
        test(block: Block) { //the function name is the same as the opcode
            return \`//\${block.getField(&quot;test&quot;)}\`;
        }
    };
  }

  Penguin.LoadExtension(Extension);
})();
" class="code-copy-button"></sl-copy-button></pre>
</section>
<section>
<h3>Posting Extensions</h3>
<p>You can post extensions to this <a href="https://github.com/PenguinBuilder/ExtensionGallery">GitHub</a></p>
<p>Create a folder for your extension and add these files</p>
<p>Submit a pull request to add it</p>
<section>
<h4>Required Files</h4>
<ul>
<li>index.js</li>
<li>options.json</li>
</ul>
</section>
<section>
<h4>index.js</h4>
<p>the file for your extension(it currently doesn't support multiple js files)</p>
<p>if the extension is of type loader then you have to have this file return a promise of a string, otherwise it is run as a normal file</p>
<hr>
</section>
<section>
<h4>image.png</h4>
<p>an optional thumbnail image for the extension</p>
<hr>
</section>
<section>
<h4>options.json</h4>
<p>Options for the file</p>
<section>
<h5>Arguments</h5>
<ul>
<li>creator: your GitHub name(I will set this for you when reviewing your pull request)</li>
<li>potential-danger: a boolean on weather the extension is potentially dangerous, if your extension is a loader then it will have this automatically set to true (I will set this for you when reviewing your pull request)</li>
<li>display-name: the name that the extension shows</li>
<li>description: the description of the extension</li>
<li>loader: an optional boolean showing weather the extension is a loader</li>
<li>WIP: optional boolean, if set to true, your extension will be hidden in the extension menu, unless they add &quot;?WIP&quot; to the end of the URL</li>
</ul>
</section>
</section>
</section>
</section>
`;f();const m=await e(()=>import("./render.js"),__vite__mapDeps([0,1,2,3]),import.meta.url);m.onDone(()=>{setTimeout(()=>{const n=location.hash.slice(1);n?c(n):i.children.length>0&&c(i.children[0].getProp("for"))},500)});const h={};await Promise.all(Object.entries(Object.assign({"./images/JSON_from.json":()=>e(()=>import("./JSON_from.js"),[],import.meta.url),"./images/call_hat.json":()=>e(()=>import("./call_hat.js"),[],import.meta.url),"./images/create_block.json":()=>e(()=>import("./create_block.js"),[],import.meta.url),"./images/create_dynamic_menu.json":()=>e(()=>import("./create_dynamic_menu.js"),[],import.meta.url),"./images/create_hat.json":()=>e(()=>import("./create_hat.js"),[],import.meta.url),"./images/create_input_from_menu.json":()=>e(()=>import("./create_input_from_menu.js"),[],import.meta.url),"./images/create_input_menu.json":()=>e(()=>import("./create_input_menu.js"),[],import.meta.url),"./images/create_menu.json":()=>e(()=>import("./create_menu.js"),[],import.meta.url),"./images/order_category.json":()=>e(()=>import("./order_category.js"),[],import.meta.url),"./images/switch.json":()=>e(()=>import("./switch.js"),[],import.meta.url)})).map(async([n,t])=>h[n]=(await t()).default));const l=o("#content");l.html(b);l.all("img").forEach(async n=>{const t=n.getProp("src");if(t.startsWith("./images/")){if(t.endsWith(".json")){m.registerElt(n,await(await fetch(h[t])).json());return}n.props({src:h[t]})}});const i=o("#toc"),y=o.all("#content>section");function j(n,t,a){return o.create("div").child([o.create("div").css({"border-radius":"100%",background:n,width:"20px",height:"20px"}).class("circ"),o.create("div").css({fontSize:"16px",background:"#00000000"}).text(t)]).css({display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"5px",padding:"5px"}).click(()=>{c(a)}).props({for:a})}y.forEach(n=>{const t=n.$("h1").text().match(/^\[(#[0-9a-fA-F]{6})\]\s*(.+)/);if(!t)return;const a=t[1],s=t[2];n.id(s.toLowerCase().trim().replaceAll(/[^a-z0-9]/g,"-")),n.$("h1").text(s);const r=j(a,s,n.id());i.child(r)});let u=!1;function c(n){history.pushState(null,"","#"+n);const t=o("#"+n);t&&(i.all("[selected]").props({selected:null}),i.$(`[for=${n}]`).props({selected:""}),u=!0,t.elt.scrollIntoView({behavior:"smooth"}))}l.on("scrollend",()=>{u=!1});let p=0;l.on("scroll",()=>{if(u)return;const n=l.elt.scrollTop,t=l.children,a=n>p;for(const s of t){const r=s.rect(),g=r.top>=0&&r.top<window.innerHeight,d=r.bottom>0&&r.bottom<=window.innerHeight;if(a?g:d){i.all("[selected]").props({selected:null}),i.$(`[for=${s.id()}]`).props({selected:""}),history.pushState(null,"","#"+s.id());break}p=n}});
