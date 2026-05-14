//TASK(20260514-121847-230-n6-065): make this work with projects using extensions 

import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import * as En from 'blockly/msg/en';
import "@/blocks/import.ts";
import getSVG from "@/save_svg.ts";
import "@/renderer/zues.ts"
import { Hats } from "@/themes.ts"
import styleSelector from '@/style-selector';
import { $, JSQuery } from 'jsquery_node';

Blockly.setLocale(En as any);

const workspace = Blockly.inject("block-editor", {
    renderer: "zues",
    theme: Hats,
} as Blockly.BlocklyOptions);

const listener: {
    elt: JSQuery.Element,
    json: Record<string, any>,
    url: string,
}[] = [];
let done = () => { }
export function onDone(id?: string, fn: () => any = () => { }) {
    done = fn;
    styleSelector((style) => {
        let scroll = 0;
        if (id)
            scroll = $(id)!.elt.scrollTop / $(id)!.elt.scrollHeight;
        (workspace as any).options.renderer = style;
        (workspace as any).renderer = Blockly.blockRendering.init(
            workspace.options.renderer || '',
            workspace.getTheme(),
            workspace.options.rendererOverrides ?? undefined,
        );
        function call(i: number) {
            if (i >= listener.length) {
                done();
                done = () => { };
                return;
            }
            const v = listener[i]
            URL.revokeObjectURL(v.url)
            const url = getURL(v.json);
            v.elt.props({
                src: url,
            });
            v.url = url;

            if (id)
                $(id)!.elt.scrollTop = scroll * $(id)!.elt.scrollHeight;
            requestAnimationFrame(call.bind(null, i + 1))
        }
        requestAnimationFrame(call.bind(null, 0))
    });
}


export function registerElt(elt: JSQuery.Element, json: Record<string, any>) {
    const url = getURL(json);
    elt.props({
        src: url,
    });
    listener.push({
        elt, json, url
    })
}

function getURL(ws: Record<string, any>) {
    Blockly.serialization.workspaces.load(ws, workspace);
    const svgString = getSVG(workspace);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    return url;
}

