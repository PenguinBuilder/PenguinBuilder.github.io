import DATA from "../DATA.ts";
import * as Blockly from "blockly/core";
import * as javascript from "blockly/javascript";

Blockly.Blocks['create_block'] = {
    init: function() {
        this.appendDummyInput()
        .setAlign(Blockly.inputs.Align.CENTRE)
        .appendField("Create Block");
        this.appendDummyInput()
        .appendField("ID")
        .appendField(new Blockly.FieldTextInput("ID"), "ID");
        this.appendDummyInput()
        .appendField("Text")
        .appendField(new Blockly.FieldTextInput("Text"), "Text");
        this.appendDummyInput()
        .appendField("Show monitor")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "Show");
        this.appendDummyInput()
        .appendField("type")
        .appendField(
            new Blockly.FieldDropdown([
                ["block", "Block"],
                ["reporter", "Reporter"],
                ["boolean", "boolean"],
            ]),
            "type"
        );
        this.appendDummyInput()
        .setAlign(Blockly.inputs.Align.CENTRE)
        .appendField("Inputs");
        this.appendStatementInput("Inputs").setCheck(null);
        this.appendDummyInput()
        .setAlign(Blockly.inputs.Align.CENTRE)
        .appendField("function");
        this.appendStatementInput("Function").setCheck(null);
        this.setStyle("scratch_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    },
};

javascript.javascriptGenerator.forBlock['create_block'] = function(block, generator) {
    const id = `${DATA.Extension_ID_DEFAULT}_Block_${block.getFieldValue('ID')}`;
    const text = block.getFieldValue('Text');
    const show = block.getFieldValue('Show') == 'TRUE';
    const type = block.getFieldValue('type');
    const inputs = generator.statementToCode(block, 'Inputs');
    const func = generator.statementToCode(block, 'Function');

    var blockType = '';
    switch (type) {
        case 'Block':
            blockType = 'COMMAND';
        break;
        case 'Reporter':
            blockType = 'REPORTER';
        break;
        case 'boolean':
            blockType = 'BOOLEAN';
        break;
    }

    const code = `
    blocks.push({
        opcode: "${id}",
        blockType: Scratch.BlockType.${blockType},
        text: "${text}",
        arguments: {
            ${inputs}
        },
        disableMonitor: ${!show}
    });
    Extension.prototype["${id}"] = async function(args, util) {
        ${func}
    };
    `;
    return code;
};

Blockly.Blocks['get_input'] = {
    init: function() {
        this.appendDummyInput()
        .appendField("get Input")
        .appendField(new Blockly.FieldTextInput("inputID"), "ID");
        this.setOutput(true, null);
        this.setStyle("scratch_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    },
};

javascript.javascriptGenerator.forBlock['get_input'] = function(block) {
    const id = block.getFieldValue('ID');

    const code = `args["${id}"]`;

    return [code, javascript.Order.ATOMIC];
};

Blockly.Blocks['create_hat'] = {
    init: function () {
        this.appendDummyInput()
        .appendField("Create Hat");
        this.appendDummyInput()
        .appendField("ID")
        .appendField(new Blockly.FieldTextInput("ID"), "ID");
        this.appendDummyInput()
        .appendField("Text")
        .appendField(new Blockly.FieldTextInput("Text"), "Text");
        this.appendDummyInput()
        .appendField("Inputs");
        this.appendStatementInput("Inputs")
        .setCheck(null);
        this.setStyle("scratch_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['create_hat'] = function (block, generator) {
    const id = `${DATA.Extension_ID_DEFAULT}_Hat_${block.getFieldValue('ID')}`;
    const text = block.getFieldValue('Text');
    const inputs = generator.statementToCode(block, 'Inputs');
    return `blocks.push({
        blockType: Scratch.BlockType.EVENT,
        opcode: "${id}",
        text: "${text}",
        arguments: {
            ${inputs}
        },
        isEdgeActivated: false
    })`;
};

Blockly.Blocks['call_hat'] = {
    init: function () {
        this.appendDummyInput()
        .appendField("Call Hat")
        .appendField(new Blockly.FieldTextInput("ID"), "ID");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("scratch_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['call_hat'] = function (block) {
    const id = `${DATA.Extension_ID_DEFAULT}_Hat_${block.getFieldValue('ID')}`;
    if ((block.getTopStackBlock()).type === "create_block") {
        var code = `util.startHats('${DATA.Extension_ID_DEFAULT}_${id}');\n`;
    } else {
        var code = `Scratch.vm.runtime.startHats('${DATA.Extension_ID_DEFAULT}_${id}');\n`;
    }
    return code;
};

Blockly.Blocks['call_hat_with_args'] = {
    init: function () {
        this.appendDummyInput()
        .appendField("Call Hat")
        .appendField(new Blockly.FieldTextInput("ID"), "ID");
        this.appendValueInput("Args")
        .setCheck("Object")
        .appendField("with Args");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("scratch_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['call_hat_with_args'] = function (block, generator) {
    const id = `${DATA.Extension_ID_DEFAULT}_Hat_${block.getFieldValue('ID')}`;
    const args = generator.valueToCode(block, 'Args', javascript.Order.ATOMIC);
    if (block.getTopStackBlock().type === "create_block") {
        var code = `util.startHats('${DATA.Extension_ID_DEFAULT}_${id}', ${args});\n`;
    } else {
        var code = `Scratch.vm.runtime.startHats('${DATA.Extension_ID_DEFAULT}_${id}', ${args});\n`;
    }
    return code;
};

Blockly.Blocks['create_input'] = {
    init: function() {
        this.appendDummyInput()
        .setAlign(Blockly.inputs.Align.CENTRE)
        .appendField("Create Input");
        this.appendDummyInput()
        .appendField("ID")
        .appendField(new Blockly.FieldTextInput("ID"), "ID");
        this.appendDummyInput()
        .appendField("type")
        .appendField(
            new Blockly.FieldDropdown([
                ["string", "String"],
                ["number", "Number"],
                ["boolean", "Boolean"],
                ["empty", "Empty"],
                ["color", "Color"],
                ["costume", "Costume"],
                ["sound", "Sound"],
                ["angle", "Angle"],
                ["note", "Note"],
                ["matrix", "Matrix"],
            ]),
            "Type"
        );
        this.appendDummyInput()
        .appendField("default text")
        .appendField(new Blockly.FieldTextInput(""), "_default");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("scratch_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    },
};

javascript.javascriptGenerator.forBlock['create_input'] = function(block) {
    const id = block.getFieldValue('ID');
    const type = block.getFieldValue('Type');
    const defaultValue = block.getFieldValue('_default');

    const code = `"${id}": {
        type: Scratch.ArgumentType.${(() => {
            switch (type) {
                case "String":
                    return "STRING";
                case "Number":
                    return "NUMBER";
                case "Boolean":
                    return "BOOLEAN";
                case "Empty":
                    return "empty";
                case "Color":
                    return "COLOR";
                case "Costume":
                    return "COSTUME";
                case "Sound":
                    return "SOUND";
                case "Angle":
                    return "ANGLE";
                case "Note":
                    return "NOTE";
                case "Matrix":
                    return "MATRIX";
            }
        })()},
        defaultValue: \`${defaultValue}\`
    },\n`;

    return code;
};

Blockly.Blocks["input_menu"] = {
    init: function () {
        this.appendDummyInput().appendField("Create Input Menu");
        this.appendDummyInput()
        .appendField("ID")
        .appendField(new Blockly.FieldTextInput("ID"), "ID");
        this.appendDummyInput()
        .appendField("Accept Reporters")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "REPORTERS");
        this.appendValueInput("MENU").setCheck("Array").appendField("menu");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("scratch_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    },
};

javascript.javascriptGenerator.forBlock["input_menu"] = function (
    block,
    generator
) {
    const id = block.getFieldValue("ID");
    const reporters = block.getFieldValue("REPORTERS") === "TRUE";
    const menu = generator.valueToCode(block, "MENU", javascript.Order.ATOMIC);
    const code = `"${id}": {
        type: Scratch.ArgumentType.STRING,
        menu: "${DATA.Extension_ID_DEFAULT}_menu_${DATA.menus}",
    },\n`;
    DATA.end += `
    menus["${DATA.Extension_ID_DEFAULT}_menu_${DATA.menus}"] = {
        acceptReporters: ${reporters},
        items: ${menu},
    };
    \n`;
    DATA.menus++;
    return code;
};

Blockly.Blocks['create_menu'] = {
    init: function () {
        this.appendDummyInput()
        .setAlign(Blockly.inputs.Align.CENTRE)
        .appendField("Create Menu");
        this.appendDummyInput()
        .appendField("ID")
        .appendField(new Blockly.FieldTextInput("ID"), "ID");
        this.appendDummyInput()
        .appendField("Accept Reporters")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "REPORTERS");
        this.appendValueInput("MENU")
        .setCheck("Array")
        .appendField("menu");
        this.setStyle("scratch_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock["create_menu"] = function (
    block,
    generator
) {
    const ID = block.getFieldValue("ID");
    const reporters = block.getFieldValue("REPORTERS") === "TRUE";
    const menu = generator.valueToCode(block, "MENU", javascript.Order.ATOMIC);
    const code = `menus["${DATA.Extension_ID_DEFAULT}_customMenu_${ID}"] = {
        acceptReporters: ${reporters},
        items: ${menu},
    };`;
    return code;
};

Blockly.Blocks['create_input_menu'] = {
    init: function () {
        this.appendDummyInput()
        .appendField("create Input from menu");
        this.appendDummyInput()
        .appendField("ID")
        .appendField(new Blockly.FieldTextInput("ID"), "ID");
        this.appendDummyInput()
        .appendField("Menu ID")
        .appendField(new Blockly.FieldTextInput("MenuID"), "MenuID");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("scratch_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['create_input_menu'] = function (block) {
    const ID = block.getFieldValue('ID');
    const menuId = block.getFieldValue('MenuID');
    const code = `"${ID}": {
        type: Scratch.ArgumentType.STRING,
        menu: "${DATA.Extension_ID_DEFAULT}_customMenu_${menuId}",
    },\n`;
    return code;
};

Blockly.Blocks['create_dynamic_menu'] = {
    init: function () {
        this.appendDummyInput()
        .setAlign(Blockly.inputs.Align.CENTRE)
        .appendField("Create Dynamic Menu");
        this.appendDummyInput()
        .appendField("ID")
        .appendField(new Blockly.FieldTextInput("ID"), "ID");
        this.appendDummyInput()
        .appendField("Accept Reporters")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "Accept");
        this.appendStatementInput("Function")
        .setCheck(null)
        .appendField("Function");
        this.setStyle("scratch_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['create_dynamic_menu'] = function (block, generator) {
    const ID = block.getFieldValue('ID');
    const reporters = block.getFieldValue('Accept') === 'TRUE';
    const func = generator.statementToCode(block, 'Function');
    const code = `
    menus["${DATA.Extension_ID_DEFAULT}_customMenu_${ID}"] = {
        acceptReporters: ${reporters},
        items: "${DATA.Extension_ID_DEFAULT}_customMenu_${ID}_func",
    };
    Extension.prototype["${DATA.Extension_ID_DEFAULT}_customMenu_${ID}_func"] = async function() {
        ${func}
    };
    `;
    return code;
};

Blockly.Blocks["menu_item"] = {
    init: function () {
        this.appendDummyInput()
        .appendField("menu item text:")
        .appendField(new Blockly.FieldTextInput("text"), "TEXT")
        .appendField(" value:")
        .appendField(new Blockly.FieldTextInput("value"), "VALUE");
        this.setOutput(true, "Object");
        this.setStyle("scratch_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    },
};

javascript.javascriptGenerator.forBlock["menu_item"] = function (
    block,
) {
    const _text = block.getFieldValue("TEXT");
    const value = block.getFieldValue("VALUE");
    const code = `{text:"${_text}", value: "${value}"}`;
    return [code, javascript.Order.ATOMIC];
};

Blockly.Blocks['return_block'] = {
    init: function() {
        this.appendValueInput('value')
        .setCheck(null)
        .appendField('return');
        this.setPreviousStatement(true, null);
        this.setStyle("scratch_blocks");
        this.setTooltip('');
        this.setHelpUrl('');
    },
};

javascript.javascriptGenerator.forBlock['return_block'] = function(block, generator) {
    const value = generator.valueToCode(block, 'value', javascript.Order.NONE);
    const code = `return ${value};`;
    return code;
};
