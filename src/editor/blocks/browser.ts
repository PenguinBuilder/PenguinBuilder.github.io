import * as Blockly from "blockly/core";
import * as javascript from "blockly/javascript";

Blockly.Blocks["browser_console"] = {
    init: function(this: Blockly.Block) {
        this.appendValueInput("VALUE").appendField("console").appendField(new Blockly.FieldDropdown([
            ["log", "log"],
            ["warn", "warn"],
            ["error", "error"],
            ["info", "info"],
        ]), "FUN")
        this.setStyle("browser_blocks")
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

javascript.javascriptGenerator.forBlock["browser_console"] = function(block, generator) {
    const fun = block.getFieldValue("FUN");
    const value = generator.valueToCode(block, "VALUE", javascript.Order.ATOMIC);
    return `console.${fun}(${value});\n`
}

Blockly.Blocks["browser_alert"] = {
    init: function () {
        this.appendValueInput("alert").setCheck("String").appendField("alert");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("browser_blocks")
        this.setTooltip("");
        this.setHelpUrl("");
    },
};

javascript.javascriptGenerator.forBlock["browser_alert"] = function (block, generator) {
    const value = generator.valueToCode(block, "alert", javascript.Order.ATOMIC);
    const code = `alert(${value});\n`;
    return code;
};

Blockly.Blocks["browser_confirm"] = {
    init: function () {
        this.appendValueInput("val").setCheck("String").appendField("confirm");
        this.setOutput(true, "Boolean");
        this.setStyle("browser_blocks")
        this.setTooltip("");
        this.setHelpUrl("");
    },
};

javascript.javascriptGenerator.forBlock["browser_confirm"] = function (
    block,
    generator
) {
    const val = generator.valueToCode(block, "val", javascript.Order.ATOMIC);
    const code = `confirm(${val})`;
    return [code, javascript.Order.ATOMIC];
};

Blockly.Blocks["browser_prompt"] = {
    init: function () {
        this.appendValueInput("val").setCheck("String").appendField("prompt");
        this.setOutput(true, "String");
        this.setStyle("browser_blocks")
        this.setTooltip("");
        this.setHelpUrl("");
    },
};

javascript.javascriptGenerator.forBlock["browser_prompt"] = function (
    block,
    generator
) {
    const val = generator.valueToCode(block, "val", javascript.Order.ATOMIC);
    const code = `prompt(${val})`;
    return [code, javascript.Order.ATOMIC];
};
