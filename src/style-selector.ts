import {$} from "jsquery_node";
export type Style = "zelos"|"thrasos"|"zues";

export default async (onchange: (name: Style)=>void = () =>{}) => {
    window.addEventListener("storage", (e) => {
        if (e.key === "style") {
            $("#style-selector")!.all(`sl-menu-item[type="checkbox"][value=${e.newValue}]`).checked(true);
            $("#style-selector")!.all(`sl-menu-item[type="checkbox"]:not([value=${e.newValue}])`).checked(false);
            setStyle(e.newValue as Style);
        }
    });

    function setStyle(
        v = $("#style-selector")!.$("sl-menu-item[type=\"checkbox\"][checked]")!.value() as Style
    ) {
        localStorage.setItem("style", v);
        onchange(v)
    }

    await customElements.whenDefined("sl-menu-item")
    {
        const key = localStorage.getItem("style")
        if(key === null) {
            let v = $("#style-selector")!.$("sl-menu-item[type=\"checkbox\"][checked]")!.value();
            localStorage.setItem("style", v);
            setStyle(v as Style);
        } else {
            $("#style-selector")!.all(`sl-menu-item[type="checkbox"][value=${key}]`).checked(true);
            $("#style-selector")!.all(`sl-menu-item[type="checkbox"]:not([value=${key}])`).checked(false);
            setStyle(key as Style);
        }
    }

    $("#style-selector")!.all("sl-menu-item[type=\"checkbox\"]").click(function () {
        let elt = $.from(this)!;
        if(elt.checked()) return;
        $("#style-selector")!.all(`sl-menu-item[type="checkbox"]:not([value="${elt.value()}"])`).checked(false);
        setStyle(elt.value() as Style);
    })
}
