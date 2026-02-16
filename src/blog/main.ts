//this is just a much less complex version of docs
import {$} from "jsquery_node";
import styleSelector from "@/style-selector";
import themeSelector from "@/theme-selector";
themeSelector();
styleSelector();

const url: Record<string, string> ={} 
await Promise.all(Object.entries(import.meta.glob("./images/*", {
    query: "url"
})).map(async ([k, v]) => url[k] = ((await v() as any).default)));

import {html} from "./blog.md"



const docs = $("#content")!;

docs.html(html);

docs.all("img").forEach(async v => {
    const str = v.getProp("src")!;
    if (str.startsWith("./images/")) {
        v.props({
            src: url[str],
        })
    }
})
