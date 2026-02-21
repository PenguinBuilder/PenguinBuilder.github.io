import * as Blockly from "blockly/core";
import {$} from "jsquery_node"

//TASK(20260212-185722-050-n6-525): fix disabled block rendering

function inlineImportantStyles(source: Element, target: Element, children: HTMLElement[]) {
    const computed = getComputedStyle(source);

    const importantProps = [
        "fill",
        "stroke",
        "stroke-width",
        "font-family",
        "font-size",
        "font-weight",
        "text-anchor",
        "dominant-baseline"
    ];

    let styleString = "";
    const b = source.matches(".blocklyHighlightedConnectionPath");
    for (const prop of importantProps) {
        if(prop === "stroke" && b) continue;
        const value = computed.getPropertyValue(prop);
        if (value) {
            if(prop === "fill") {
                if(value.startsWith("url(\"#")) {
                    const [,id] = value.match(/url\("(.*)"\)/)!;
                    children.push($(id)!.elt)
                }
            }
            styleString += `${prop}:${value};`;
        }
    }

    if (styleString) {
        target.setAttribute("style", styleString);
    }

    const sourceChildren = source.children;
    const targetChildren = target.children;

    for (let i = 0; i < sourceChildren.length; i++) {
        inlineImportantStyles(sourceChildren[i], targetChildren[i], children);
    }
}

export default function (workspace: Blockly.WorkspaceSvg) {
    workspace.getAllBlocks(false).forEach(b => b.render());

    const canvas = workspace.getCanvas();

    const clone = canvas.cloneNode(true) as SVGGElement;
    const children: HTMLElement[] = [];

    inlineImportantStyles(canvas, clone, children);

    const bbox = canvas.getBBox();

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

        svg.setAttribute("width", bbox.width.toString());
    svg.setAttribute("height", bbox.height.toString());
    svg.setAttribute("viewBox", `0 0 ${bbox.width} ${bbox.height}`);

    clone.setAttribute(
        "transform",
        `translate(${-bbox.x}, ${-bbox.y})`
    );

    svg.appendChild(clone);
    svg.prepend(...children.map(v => {
        return v.cloneNode(true)
    }))
    const svgString = new XMLSerializer().serializeToString(svg);
    return svgString;
}
