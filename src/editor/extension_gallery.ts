import {$} from "jsquery_node";
import defaultimg from "./default.png?url"
import DATA from "@/DATA.ts";
import * as Terser from "terser";
import { ToolboxInfo } from "blockly/core/utils/toolbox";
import { WorkspaceSvg } from "blockly";

export default async function(run: (rerenderToolbox: ()=>void, code: string, id: string)=>void, toolbox: ToolboxInfo, workspace: WorkspaceSvg, rerenderToolbox: ()=>void): Promise<()=>void> {
    const dialog = $('#extensionGallery')!;

    const div = $.create("div").css({
        display: "flex",
        "flex-wrap": "wrap",
        "justify-content": "center",
        "gap": "10px",
    });
    dialog.child(div);
    const head = "https://raw.githubusercontent.com/PenguinBuilder/ExtensionGallery/refs/heads/main/"
    async function getfile(ext:{name: string}, file: string): Promise<[true, string]|[false, null]> {
        const url = `${head}${ext.name}/${file}`;
            const res = await fetch(url)
        if(res.ok) {
            return [true, await res.text()];
        } else {
            return [false, null];
        }
    }

    async function geturl(ext:{name: string}, file: string): Promise<[true, string]|[false, null]> {
        const url = `${head}${ext.name}/${file}`;
            const res = await fetch(url)
        if(res.ok) {
            return [true, url];
        } else {
            return [false, null];
        }
    }

    function createCard(imageURL: string, title: string, desc: string, author: string, fn: (this: HTMLElement)=>any) {
        const card = $.create("sl-card").child([
            $.create("img").props({
                slot: "image",
                src: imageURL,
            }),
            $.create("strong").text(title),
            $.create("br"),
            $.create("div").text(desc).css({
                "overflow-y": "auto",
                "display": "block",
                "height": "3em",
            }),
            $.create("br"),
            $.create("small").text(`by: ${author}`),
            $.create("div").props({slot:"footer"}).child(
                $.create("sl-button").props({variant: "primary"}).text("Load Extension").click(fn)
            )
        ]).css({
            "width": "300px",
        });
        return card;
    }
    const url = "https://api.github.com/repos/chickencuber/PenguinBuilder_ExtensionGallery/contents?cache=" + Date.now();
        const exclude = [
        "extensions.d.ts",
        "tsconfig.json",
        "README.md",
        "example",
        "extensionlist.json",
    ]
    const val: {name:string}[] = (await (await fetch(url)).json())?.filter?.((v: {name: string}) => {
        return !exclude.includes(v.name);
    }) ||
        (await (await fetch(head + "extensionlist.json")).json())?.map?.((v: string) => { //in case the api fails, this likely wont be the most up to date
        return {name: v};
    })
        || [{name: "from_file"}, {name: "from_url"}]; //this is in case even that fails
    interface Options {
        creator: string;
        potential_danger: boolean;
        display_name: string;
        description: string;
        loader: boolean;
        WIP: boolean;
    }
    interface Extension {
        options: Options;
        image?: string,
        index: string;
        name: string;
    }

    function createCardFrom(d: Extension) {
        const card = createCard(
            d.image??defaultimg,
            d.options.display_name,
            d.options.description,
            d.options.creator,
            async () => {
                let code = d.index;
                let id = d.name;
                if(d.options.loader) {
                    const [c, n] = await (new Function("$", d.index)($) as Promise<[string, string]>)
                    code = c;
                    id = n;
                }
                id = "e_" + id; //this is just so you cant break things by naming it constructor or something
                code = Terser.minify_sync(code).code!
                if(id in DATA.extensions) {
                    const i = toolbox.contents.findIndex(v=>(v as any).id == id);
                    delete DATA.extensions[id];
                    delete DATA.outputs[id];
                    toolbox.contents.splice(i);
                    workspace.updateToolbox(toolbox);
                    workspace.refreshToolboxSelection();
                }
                DATA.extensions[id] = code; //save file purposes
                DATA.outputs[id] = {};
                run(rerenderToolbox, code, id);
                (dialog.elt as any).hide();
                rerenderToolbox();
            }
        )
        div.child(card);
    }

    for(const v of val) {
        //@ts-ignore
        const d: Extension = {};
        d.name = v.name;
        const [optione, option] = await getfile(v, "options.json");
        const [indexe, index] = await getfile(v, "index.js");
        const [imagee, image] = await geturl(v, "image.png");
        if(!optione||!indexe) continue;
        if(imagee) {
            d.image = image;
        }
        let options;
        //@ts-ignore
        d.options = {};

        try{
            options = JSON.parse(option)
        } catch {
            continue;
        }
        if(
            !("creator" in options) ||
            !("potential-danger" in options) ||
        !("display-name" in options) ||
    !("description" in options)
        ) continue;

        d.options.creator = options["creator"];
        d.options.potential_danger = options["potential-danger"];
        d.options.display_name = options["display-name"];
        d.options.description = options["description"];
        d.options.WIP = options["WIP"] ?? false;
        d.options.loader = options["loader"] ?? false;
        d.index = index;


        const params = new URLSearchParams(location.search.toLowerCase());
        if(d.options.WIP && !params.has("wip"))
            continue;

        createCardFrom(d)
    }

    return function() {
        (dialog.elt as any).show()
    }
}
