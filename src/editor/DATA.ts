import {$} from "jsquery_node";

export default new (class {
    end = "";
    very_end = "";
    menus = 0;
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
    get Extension_Color() {
        return $("#extcolor")!.value();
    }
    set Extension_Color(v) {
        $("#extcolor")!.value(v);
    }
    get Force_Unsandboxed() {
        return $("#unsandboxed")!.checked();
    }
    set Force_Unsandboxed(v) {
        $("#unsandboxed")!.checked(v);
    }
})
