
import * as javascript from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import {registerFieldAngle, FieldAngle} from "@blockly/field-angle";

registerFieldAngle();

Blockly.Blocks['math_angle'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new FieldAngle(90), 'Angle');
        this.setOutput(true, 'Number');
        this.setColour(225);
        this.setTooltip("");
        this.setHelpUrl("");
    },
}

javascript.javascriptGenerator.forBlock['math_angle'] = function (
    block,
    generator,
) {
    const code = block.getFieldValue('Angle', );
    return [code, javascript.Order.ATOMIC];
};

Blockly.Blocks['math_convert_degrees'] = {
    init: function() {
        this.appendValueInput("Degrees")
            .setCheck("Number")
            .appendField(new Blockly.FieldDropdown([["to degrees","degrees"], ["to radians","radians"]]), "to");
        this.setOutput(true, "Number");
        this.setColour(225);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['math_convert_degrees'] = function(block, generator) {
    const to = block.getFieldValue('to');
    const  degrees = generator.valueToCode(block, 'Degrees', javascript.Order.ATOMIC);
    let code;
    if(to === "degrees") {
        code = `(${degrees}*180/Math.PI)`;
    } else {
        code = `(${degrees}*Math.PI/180)`;
    }
    return [code, javascript.Order.ATOMIC];
};
