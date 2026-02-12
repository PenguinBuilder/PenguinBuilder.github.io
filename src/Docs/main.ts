import themeSelector from "../theme-selector.ts";
import "./images.ts";
themeSelector();

import {$} from "jsquery_node";

import {html} from "./docs.md"

$('#content')!.html(html);

const toc = $("#toc")!;
const headers = $.all('#content>section');

function createCategory(color: string, text: string, id: string) {
    return $.create("div").child([
        $.create("div").css({
            "border-radius": "100%",
            background: color,
            border: "1px solid var(--bordercolor)",
            width: "20px",
            height: "20px",
        }),
        $.create("div").css({
            fontSize: "16px",
            background: "#00000000",
        }).text(text),
    ]).css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
        padding: "5px",
    }).click(()=>{
        scrollId(id);
    }).props({
        for: id,
    })
}

headers.forEach(h => {
    const match = h.$("h1")!.text().match(/^\[(#[0-9a-fA-F]{6})\]\s*(.+)/);
    if (!match) return;

    const color = match[1];
    const title = match[2];

    h.id(title.toLowerCase().trim().replaceAll(/[^a-z0-9]/g, '-'));

    h.$("h1")!.text(title);

    const btn = createCategory(color, title, h.id());
    toc.child(btn as any);
});

let isScrolling = false;
function scrollId(id: string) {
    history.pushState(null, "", "#" + id);
    const target = $("#" + id);
    if (target) {
        toc.all("[selected]").props({
            selected: null,
        });
        toc.$(`[for=${id}]`)!.props({
            selected: "",
        });
        isScrolling = true;
        target.elt.scrollIntoView({ behavior: "smooth" });
    };
}



requestAnimationFrame(() => {
    const hash = location.hash.slice(1);
    if (hash) {
        scrollId(hash);
    } else if (toc.children.length > 0) {
        scrollId(toc.children[0].getProp("for")!)
    }
});


const docs = $("#content")!;

docs.on("scrollend", () => {
    isScrolling = false;
})

let lastScroll = 0;
docs.on("scroll", () => {
    if(isScrolling) return;
    const scrollTop = docs.elt.scrollTop;
    const children = docs.children;

    const down = scrollTop > lastScroll;

    for (const section of children) {
        const rect = section.rect();
        const topVisible = rect.top >= 0 && rect.top < window.innerHeight;
        const bottomVisible = rect.bottom > 0 && rect.bottom <= window.innerHeight;

        if (down ? topVisible: bottomVisible) {
            toc.all("[selected]").props({
                selected: null,
            });
            toc.$(`[for=${section.id()}]`)!.props({
                selected: "",
            })
            history.pushState(null, "", "#" + section.id());
            break;
        }
        lastScroll = scrollTop;
    }
})

