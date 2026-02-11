import * as Blockly from "blockly/core";
import * as javascript from "blockly/javascript";
import DATA from "../DATA.ts";

Blockly.Blocks['create_label'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("create label with text")
            .appendField(new Blockly.FieldTextInput("text"), "text");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("category_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['create_label'] = function (block) {
    const text = block.getFieldValue('text');
    const id = "label_" + crypto.randomUUID();
    DATA.end += `
    blocks.push({
        opcode: "${id}",
        blockType: Scratch.BlockType.LABEL,
        text: "${text}",
    });
    `;
    const code = `"${id}", `;
    return code;
};

Blockly.Blocks['create_button'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("create button");
        this.appendDummyInput()
            .appendField("text")
            .appendField(new Blockly.FieldTextInput("text"), "text");
        this.appendStatementInput("on_click")
            .setCheck(null)
            .appendField("on click");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("category_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['create_button'] = function (block, generator) {
    const text = block.getFieldValue('text');
    const on_click = generator.statementToCode(block, 'on_click');
    const id = "button_" + crypto.randomUUID();
    DATA.end += `
    blocks.push({
        opcode: "${id}",
        func: "${id}",
        blockType: Scratch.BlockType.BUTTON,
        text: "${text}",
      });
      Extension.prototype["${id}"] = async function(util) {
        ${on_click}
      };`
    const code = `"${id}", `;
    return code;
};

Blockly.Blocks['order_category'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Order Category");
        this.appendStatementInput("types")
            .setCheck(null);
        this.setStyle("category_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['order_category'] = function (block, generator) {
    const types = generator.statementToCode(block, 'types');
    DATA.very_end += `
    (() => {
    const temp = [
        ${types}
    ];
    blocks.sort((a, b) => {
        a = temp.indexOf(a.opcode);
        b = temp.indexOf(b.opcode);
        if(a === -1) {
          if(b === -1) {
            return 0;
          } else {
            return 1;
          }
        } else if(b === -1) {
          return -1;
        }
        return a - b;
      })
})();`
    return "";
};

Blockly.Blocks['use_block'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("use block id:")
            .appendField(new Blockly.FieldTextInput("id"), "id");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("category_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['use_block'] = function (block) {
    const id = block.getFieldValue('id');
    const code = `"${DATA.Extension_ID_DEFAULT}_Block_${id}",`;
    return code;
};

Blockly.Blocks['use_hat'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("use hat id:")
            .appendField(new Blockly.FieldTextInput("id"), "id");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("category_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['use_hat'] = function (block) {
    const id = block.getFieldValue('id');
    const code = `"${DATA.Extension_ID_DEFAULT}_Hat_${id}",`;
    return code;
};
