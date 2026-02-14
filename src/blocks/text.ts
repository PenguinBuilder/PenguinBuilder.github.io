import * as javascript from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import {textMultiline} from "@blockly/field-multilineinput"

textMultiline.installBlock({
    javascript: javascript.javascriptGenerator,
});

Blockly.Blocks["newline"] = {
    init: function () {
        this.appendDummyInput().appendField("new line");
        this.setOutput(true, "String");
        this.setStyle("text_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    },
};

javascript.javascriptGenerator.forBlock["newline"] = function () {
    const code = '"\\n"';
    return [code, javascript.Order.ATOMIC];
};
