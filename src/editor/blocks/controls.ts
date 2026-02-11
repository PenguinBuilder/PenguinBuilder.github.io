import * as javascript from 'blockly/javascript';
import * as Blockly from 'blockly/core';

Blockly.Blocks['controls_wait'] = {
    init: function() {
        this.appendValueInput("millis")
        .setCheck("Number")
        .appendField("wait");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("loop_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['controls_wait'] = function(block, generator) {
    const millis = generator.valueToCode(block, 'millis', javascript.Order.ATOMIC);
    const code = `(await ((m) => {
        return new Promise((r) => setTimeout(() => r(), m));
    })(${millis}));\n`
    return code;
};

Blockly.Blocks['controls_try'] = {
    init: function() {
        this.appendStatementInput("stmt")
        .setCheck(null)
        .appendField("try");
        this.setInputsInline(false);
        this.setOutput(true, "Boolean");
        this.setStyle("loop_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['controls_try'] = function(block, generator) {
    const stmt = generator.statementToCode(block, 'stmt');
    const code = `(await( async() => {
        try {
            ${stmt}
            return true;
        } catch(e) {
            return false;
        }
    })())`;
    return [code, javascript.Order.ATOMIC];
};


Blockly.Blocks['controls_wait_until'] = {
    init: function() {
        this.appendValueInput("bool")
        .setCheck("Boolean")
        .appendField("wait until");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("loop_blocks")
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['controls_wait_until'] = function(block, generator) {
    const bool = generator.valueToCode(block, 'bool', javascript.Order.ATOMIC);
    const code = `await new Promise(r => {
        async function loop() {
            if (${bool}) {
                r()
                return;
            }
            setTimeout(loop, 50)
        }
        setTimeout(loop)
    });`;
    return code;
};
