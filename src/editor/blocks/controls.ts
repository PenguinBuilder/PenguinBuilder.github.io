import * as javascript from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import {registerFieldAngle, FieldAngle} from "@blockly/field-angle";

Blockly.Blocks['controls_wait'] = {
    init: function() {
        this.appendValueInput("millis")
            .setCheck("Number")
            .appendField("wait");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['controls_wait'] = function(block, generator) {
    const millis = generator.valueToCode(block, 'millis', javascript.Order.ATOMIC);
    const code = `await wait(${millis});\n`;
    return code;
};

Blockly.Blocks['controls_try'] = {
    init: function() {
        this.appendStatementInput("stmt")
            .setCheck(null)
            .appendField("try");
        this.setInputsInline(false);
        this.setOutput(true, "Boolean");
        this.setColour(120);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['controls_try'] = function(block, generator) {
    const stmt = generator.statementToCode(block, 'stmt');
    const code = `((() => {
        const localVars = {};
        try {
            ${stmt}
            return true;
        } catch(e) {
            return false;
        }
    })())`;
    return [code, javascript.Order.ATOMIC];
};
