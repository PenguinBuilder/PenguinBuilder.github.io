import {$} from "jsquery_node";
import {compressToUTF16, decompressFromUTF16} from "lz-string";

export interface Save {
    workspace: Record<string, any>
    extension_color: string,
    force_unsandboxed: boolean,
    extension_name?: string,
    extension_id?: string,
}

export default function(serialize: ()=>[Save, string], deserialize: (v:Save)=>any) {
    function encode(s: Save):string {
        return compressToUTF16(JSON.stringify(s)); 
    }
    function decode(s: string):Save {
        return JSON.parse(decompressFromUTF16(s));
    }
    async function saveAs() {
        const [s, name] = serialize();
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: name+'.pb',
            types: [{
                description: 'PenguinBuilder Save',
                accept: { 'application/octet-stream': ['.pb'] }
            }]
        });
        filehandle = fileHandle;

        const writable = await fileHandle.createWritable();
        await writable.write(encode(s));
        await writable.close();
    }
    let filehandle: FileSystemFileHandle|undefined;
    async function save() {
        if(filehandle === undefined) {
            await saveAs();
            return;
        }
        const writable = await filehandle.createWritable();
        await writable.write(encode(serialize()[0]));
        await writable.close();
    }
    $("#save-as")!.click(saveAs);
    $("#save")!.click(save);
    $("html")!.on("keydown", async (e: KeyboardEvent) => {
        if((e.ctrlKey || e.metaKey) && e.key == "s") {
            await save();
            e.preventDefault();
        }
    });
    $("#open")!.click( async () => {
        const [fileHandle] = await window.showOpenFilePicker({
            multiple: false,
            types: [{
                description: 'PenguinBuilder Save',
                accept: { 'application/octet-stream': ['.pb'] }
            }]
        });
        filehandle = fileHandle;
        const file = await fileHandle.getFile();
        const compressedText = await file.text();
        const saveData = decode(compressedText);
        deserialize(saveData);
    });
}
