import * as Blockly from "blockly/core"
import * as javascript from "blockly/javascript"
import { FieldMultilineInput } from "@blockly/field-multilineinput";

Blockly.Blocks['eval'] = {
    init: function() {
        this.appendValueInput("eval")
        .setCheck("String")
        .appendField("eval");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("advanced_blocks")
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['eval'] = function(block, generator) {
    const _eval = generator.valueToCode(block, 'eval', javascript.Order.ATOMIC);
    const code = `eval(${_eval});\n`;
    return code;
};

Blockly.Blocks['eval_ret'] = {
    init: function() {
        this.appendValueInput("eval")
        .setCheck("String")
        .appendField("eval");
        this.setOutput(true, null);
        this.setStyle("advanced_blocks")
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['eval_ret'] = function(block, generator) {
    const _eval = generator.valueToCode(block, 'eval', javascript.Order.ATOMIC);
    const code = `eval(${_eval})`;
    return [code, javascript.Order.ATOMIC];
};


Blockly.Blocks['raw'] = {
    init: function(this: Blockly.Block) {
        this.appendDummyInput()
        .appendField("raw")
        .appendField(new FieldMultilineInput(), "raw");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("advanced_blocks")
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['raw'] = function(block) {
    const code = block.getFieldValue("raw");
    return code;
};

Blockly.Blocks['raw_ret'] = {
    init: function() {
        this.appendDummyInput()
        .appendField("raw")
        .appendField(new FieldMultilineInput(), "raw");
        this.setOutput(true, null);
        this.setStyle("advanced_blocks")
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['raw_ret'] = function(block) {
    const code = block.getFieldValue("raw");
    return [code, javascript.Order.ATOMIC];
};
