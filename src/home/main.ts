import styleSelector from "@/style-selector";
import themeSelector from "@/theme-selector";
themeSelector();
styleSelector();
import { $ } from "jsquery_node";


const Render = await import("@/render.ts");

const url: Record<string, string> = {}
await Promise.all(Object.entries(import.meta.glob("./images/*", {
    query: "url"
})).map(async ([k, v]) => url[k] = ((await v() as any).default)));

Promise.all($.body().all("img").map(async v => {
    const str = v.getProp("src")!;
    if (str.startsWith("./images/")) {
        if (str.endsWith(".json")) {
            Render.registerElt(v, await (await fetch(url[str])).json());
            return;
        }
        v.props({
            src: url[str],
        })
    }
})).then(() => { Render.onDone() });
