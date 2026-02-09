import {$} from "jsquery_node";
export default (onlight: ()=>any = ()=>{}, ondark: ()=>any = ()=>{}) => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
        const v = $("#theme-selector")!.$("sl-menu-item[type=\"checkbox\"][checked]")!.value() as "dark"|"light"|"auto";
        if (v === 'auto') {
            setTheme();
        }
    });
    window.addEventListener("storage", (e) => {
        if (e.key === "theme") {
            $("#theme-selector")!.all(`sl-menu-item[type="checkbox"][value=${e.newValue}]`).checked(true);
            $("#theme-selector")!.all(`sl-menu-item[type="checkbox"]:not([value=${e.newValue}])`).checked(false);
            setTheme(e.newValue as "light"|"dark"|"auto");
        }
    });

    function setTheme(
        v = $("#theme-selector")!.$("sl-menu-item[type=\"checkbox\"][checked]")!.value() as "dark"|"light"|"auto"
                     ) {
        const auto = mediaQuery.matches;
        const dark = {dark: true, light: false, auto}
        localStorage.setItem("theme", v);
        if(dark[v]) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.setAttribute('class', 'sl-theme-dark');
            ondark();
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.setAttribute('class', 'sl-theme-light');
            onlight();
        }
    }

    {
        const key = localStorage.getItem("theme")
        if(key === null) {
            let v = $("#theme-selector")!.$("sl-menu-item[type=\"checkbox\"][checked]")!.value();
            localStorage.setItem("theme", v);
        } else {
            $("#theme-selector")!.all(`sl-menu-item[type="checkbox"][value=${key}]`).checked(true);
            $("#theme-selector")!.all(`sl-menu-item[type="checkbox"]:not([value=${key}])`).checked(false);
        }
    }

    setTheme();

    $("#theme-selector")!.all("sl-menu-item[type=\"checkbox\"]").click(function () {
        let elt = $.from(this)!;
        if(elt.checked()) return;
        $("#theme-selector")!.all(`sl-menu-item[type="checkbox"]:not([value="${elt.value()}"])`).checked(false);
        setTheme(elt.value() as "auto"|"dark"|"light");
    })
}
