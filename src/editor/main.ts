import "./blocks/math.ts";
import "./blocks/text.ts";
import "./blocks/colour.ts";
import "./blocks/controls.ts";

import FileHandle, { Save } from "./files.ts";

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

const DATA = new (class {
    get Extension_ID_DEFAULT() {
        return this.Extension_ID||"extensionid"
    }
    get Extension_ID() {
        return $("#ExtensionID")!.value();
    }
    set Extension_ID(v) {
        $("#ExtensionID")!.value(v);
    }
    get Extension_Name_DEFAULT() {
        return this.Extension_Name||"Extension Name"
    }
    get Extension_Name() {
        return $("#ExtensionName")!.value();
    }
    set Extension_Name(v) {
        $("#ExtensionName")!.value(v);
    }
})

$("#ExtensionID")!.on("input", function(this: HTMLInputElement) {
    this.value = this.value.toLowerCase().replaceAll(/[^a-z0-9]/g, "");
} as any);

Blockly.setLocale(En as any);

registerContinuousToolbox();

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
    } as Save;
    if(DATA.Extension_ID !== "") {
        save.extension_id = DATA.Extension_ID;
    }
    if(DATA.Extension_Name !== "") {
        save.extension_name = DATA.Extension_Name;
    }
    return [save, DATA.Extension_ID_DEFAULT];
}, (s)=>{
    Blockly.serialization.workspaces.load(s.workspace, workspace); 
});

themeSelector(() => workspace.setTheme(Hats), () => workspace.setTheme(HatsDark));

function getCode(): string {
    // workspace.getVariableMap().getAllVariables().forEach(v=>v.setName(Extension_ID + "_" + v.getName()))
    return "";
}

$("#export")!.click(async () => {
    if (Object.keys(Blockly.serialization.workspaces.save(workspace)).length === 0) {
        notify("You can't export when the workspace is empty", {
            header: "Failed Export",
            variant: "danger",
            icon: "exclamation-octagon",
        });
        return;
    }
    if($("#ExtensionID")!.is(":invalid")) {
        notify("The ExtensionID is invalid", {
            header: "Failed Export",
            variant: "danger",
            icon: "exclamation-octagon",
        });
        return;
    }
    return;

    const fileHandle = await window.showSaveFilePicker({
        suggestedName: (DATA.Extension_ID_DEFAULT)+'.js',
        types: [{
            description: 'PenguinBuilder Save',
            accept: { 'application/javascript': ['.js'] }
        }]
    });

    const writable = await fileHandle.createWritable();
    await writable.write(getCode());
    await writable.close();
})

workspace.setScale(0.7);
workspace.addChangeListener(Blockly.Events.disableOrphans);
const workspaceSearch = new WorkspaceSearch(workspace);
workspaceSearch.init();

