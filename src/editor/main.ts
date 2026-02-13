import FileHandle, { Save } from "./files.ts";

import * as Terser from "terser";

import {$} from "jsquery_node";
import {Hats, HatsDark} from "./themes.ts"
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import * as En from 'blockly/msg/en';
import {
    ContinuousToolbox,
    ContinuousFlyout,
    ContinuousMetrics,
    registerContinuousToolbox,
} from '@blockly/continuous-toolbox';
import toolbox from './toolbox.json';
import '@blockly/toolbox-search';
import {WorkspaceSearch} from '@blockly/plugin-workspace-search';

import themeSelector from "../theme-selector.ts";
import * as javascript from "blockly/javascript";
import "./blocks/import.ts";
import {js_beautify} from "js-beautify";

import run from "./extension.ts";
import ExtensionGallery from "./extension_gallery.ts";

import DATA from "./DATA.ts";

import getSVG from "./save_svg.ts";
import { ContextMenuOption } from "blockly/core/contextmenu_registry";

$("#ExtensionID")!.on("input", function(this: HTMLInputElement) {
    this.value = this.value.toLowerCase().replaceAll(/[^a-z0-9]/g, "");
} as any);

Blockly.setLocale(En as any);

registerContinuousToolbox();
Blockly.ContextMenuItems.registerCommentOptions();

const workspace = Blockly.inject("block-editor", {
    plugins: {
        toolbox: ContinuousToolbox,
        flyoutsVerticalToolbox: ContinuousFlyout,
        metricsManager: ContinuousMetrics,
    },
    renderer: "zelos",
    toolbox,
    theme: Hats,
} as Blockly.BlocklyOptions);

workspace.registerToolboxCategoryCallback(
    'PROCEDURE',
    function(workspace) {
        const extraBlocks = [
            {
                "kind": "block",
                "type": "inline_function_a",
                "gap": 8,
                "enabled": true
            },
            {
                "kind": "block",
                "type": "inline_function_b",
                "gap": 8,
                "enabled": true
            },
            {
                "kind": "block",
                "type": "inline_function_c",
                "gap": 8,
                "enabled": true
            },
            {
                "kind": "block",
                "type": "return_block_function",
                "gap": 8,
                "enabled": true
            },
        ];
        // Call the existing procedure flyout
        const procBlocks = Blockly.Procedures.flyoutCategory(workspace, false);
        return [...procBlocks, ...extraBlocks];
    }
);

function notify(message: string, {variant = 'primary', icon = 'info-circle', duration = 3000, closable=true, header=""}: {
    variant?: "primary" | "success" | "neutral" | "warning" | "danger",
    icon?: string,
    duration?: number,
    closable?: boolean,
    header?: string,
} = {}) {
    const t = $.create("sl-alert").props({
        variant,
        duration,
        closable: closable? "": null,
        countdown:"rtl"
    });
    t.child($.create("sl-icon").props({name:icon}))
    t.child([$.create("strong").text(header).css({
        "margin-left": "10px",
    }), $.create("br")])
    t.child($.from(document.createTextNode(message) as any) as any);
    $.body().child(t)
    setTimeout(()=>(t.elt as any).toast(), 100);
}

FileHandle(() => {
    const save = {
        workspace: Blockly.serialization.workspaces.save(workspace),
        extension_color: DATA.Extension_Color,
        force_unsandboxed: DATA.Force_Unsandboxed,
        extensions: DATA.extensions,
    } as Save;
    if(DATA.Extension_ID !== "") {
        save.extension_id = DATA.Extension_ID;
    }
    if(DATA.Extension_Name !== "") {
        save.extension_name = DATA.Extension_Name;
    }
    return [save, DATA.Extension_ID_DEFAULT];
}, (s)=>{
    DATA.Force_Unsandboxed = s.force_unsandboxed;
    DATA.Extension_Color = s.extension_color;
    DATA.Extension_ID = s.extension_id || "";
    DATA.Extension_Name = s.extension_name || "";
    for(const k of Object.keys(DATA.extensions)) {
        const i = toolbox.contents.findIndex(v=>(v as any).id == k);
        toolbox.contents.splice(i);
    }
    workspace.updateToolbox(toolbox);
    workspace.refreshToolboxSelection();
    DATA.extensions = {};
    Blockly.serialization.workspaces.load(s.workspace, workspace); 
    const ext = s.extensions ?? {};
    for(const [k, v] of Object.entries(ext)) {
        DATA.extensions[k] = v;
        run(toolbox, workspace, v, k);
    }
});

themeSelector(() => workspace.setTheme(Hats), () => workspace.setTheme(HatsDark));
{
    const o = Blockly.Names.prototype.getName;
    Blockly.Names.prototype.getName = function(nameOrdId: string, type) {
        return DATA.Extension_ID_DEFAULT + "_" + o.call(this, nameOrdId, type);
    }
}

function getCode(minify = false): string {
    DATA.end = "";
    DATA.very_end = "";
    DATA.menus = 0;
    //TASK(20260210-081937-269-n6-603): handle code generation
    const code = `
    // Made with PenguinBuilder ${$("#version")!.text()}
    // use PenguinBuilder at "https://penguinbuilder.github.io"
    (async function(Scratch) {
        const blocks = [];
        const menus = {};

        ${DATA.Force_Unsandboxed ? `if (!Scratch.extensions.unsandboxed) {
            throw new Error('${DATA.Extension_Name_DEFAULT} must run unsandboxed');
        }`: ""}

        class Extension {
            getInfo() {
                return {
                    "id": "${DATA.Extension_ID_DEFAULT}",
                    "name": "${DATA.Extension_Name_DEFAULT}",
                    "color1": "${DATA.Extension_Color}",
                    "blocks": blocks,
                    "menus": menus,
                }
            }
        }
        \n` +
            javascript.javascriptGenerator.workspaceToCode(workspace) +
            `\n
        ${DATA.end}
        ${DATA.very_end}
        Scratch.extensions.register(new Extension());
    })(Scratch);
    `;
    if(minify) {
        return Terser.minify_sync(code).code!
    } else {
        return js_beautify(code, {
            indent_size: 4,
            max_preserve_newlines: 2,
        }); 
    }
}

$("#test")!.click(() => {
    const code = getCode(true);
    if(exists()) {
        const url = encodeURI("data:application/javascript;base64," + btoa(code));
        window.open("https://studio.penguinmod.com/editor.html?extension=" + url)
    }
});

function exists() {
    const top_blocks = workspace.getTopBlocks(false).filter(b=>b.isEnabled())
    if (top_blocks.length === 0) {
        notify("You can't export when the workspace is empty", {
            header: "Failed Export",
            variant: "danger",
            icon: "exclamation-octagon",
        });
        return false;
    }
    if($("#ExtensionID")!.is(":invalid")) {
        notify("The ExtensionID is invalid", {
            header: "Failed Export",
            variant: "danger",
            icon: "exclamation-octagon",
        });
        return false;
    }
    return true;
}

$("#export")!.click(async () => {
    if(!exists()) return;
    const fileHandle = await window.showSaveFilePicker({
        suggestedName: (DATA.Extension_ID_DEFAULT)+'.js',
        types: [{
            description: 'PenguinBuilder Save',
            accept: { 'application/javascript': ['.js'] }
        }],
    });

    const writable = await fileHandle.createWritable();
    await writable.write(getCode());
    await writable.close();
});

workspace.setScale(0.7);
workspace.addChangeListener(Blockly.Events.disableOrphans);
const workspaceSearch = new WorkspaceSearch(workspace);
workspaceSearch.init();

const showDialog = await ExtensionGallery(run.bind(null, toolbox, workspace));

workspace.registerButtonCallback("Load_Extension", () => {
    showDialog();
});

workspace.configureContextMenu = function (menuOptions, e) {
    const item: ContextMenuOption = {
        text: 'Export Workspace to SVG',
        enabled: true,
        callback: async function () {
            if(!exists()) return;
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: "workspace.svg",
                types: [{
                    accept: { 'image/svg+xml': ['.svg'] }
                }],
            });

            const writable = await fileHandle.createWritable();
            await writable.write(getSVG(workspace));
            await writable.close();
        },
        scope: {},
        weight: 0,
    };
    menuOptions.push(item);
}

