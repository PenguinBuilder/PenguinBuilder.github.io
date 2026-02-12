import * as Blockly from "blockly/core";
import * as javascript from "blockly/javascript";
import DATA from "../DATA.ts"

Blockly.Blocks["inline_function_a"] = {
    init: function () {
        this.appendDummyInput().appendField("inline function");
        this.appendStatementInput("statement").setCheck(null);
        this.setStyle("procedure_blocks")
        this.setTooltip("");
        this.setHelpUrl("");
    },
};

javascript.javascriptGenerator.forBlock["inline_function_a"] = function (
    block,
    generator
) {
    const statement = generator.statementToCode(block, "statement");
    const code = `(await (async () => {
        ${statement}
    })());\n`;
    return code;
};

Blockly.Blocks["inline_function_b"] = {
    init: function () {
        this.appendDummyInput().appendField("inline function");
        this.appendStatementInput("statement").setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("procedure_blocks")
        this.setTooltip("");
        this.setHelpUrl("");
    },
};

javascript.javascriptGenerator.forBlock["inline_function_b"] = function (
    block,
    generator
) {
    const statement = generator.statementToCode(block, "statement");
    const code = `(await (async () => {
        ${statement}
    })());\n`;
    return code;
};

Blockly.Blocks["inline_function_c"] = {
    init: function () {
        this.appendDummyInput().appendField("inline function");
        this.appendStatementInput("statement").setCheck(null);
        this.setOutput(true, null);
        this.setStyle("procedure_blocks")
        this.setTooltip("");
        this.setHelpUrl("");
    },
};

javascript.javascriptGenerator.forBlock["inline_function_c"] = function (
    block,
    generator
) {
    const statement = generator.statementToCode(block, "statement");
    const code = `(await (async () => {
        ${statement}
    })())`;
    return [code, javascript.Order.ATOMIC];
};

Blockly.Blocks['return_block_function'] = {
    init: function() {
        this.appendValueInput('value')
        .setCheck(null)
        .appendField('return');
        this.setPreviousStatement(true, null);
        this.setStyle("procedure_blocks")
        this.setTooltip('');
        this.setHelpUrl('');
    },
};

javascript.javascriptGenerator.forBlock['return_block_function'] = function(block, generator) {
    const value = generator.valueToCode(block, 'value', javascript.Order.ATOMIC);
    const code = `return ${value};`;
    return code;
};

//stole this from the blockly github and added asyng
function procedures_defreturn(
    block: Blockly.Block,
    generator: javascript.JavascriptGenerator,
) {
    // Define a procedure with a return value.
    const funcName = generator.getProcedureName(block.getFieldValue('NAME'));
    let xfix1 = '';
    if (generator.STATEMENT_PREFIX) {
        xfix1 += generator.injectId(generator.STATEMENT_PREFIX, block);
    }
    if (generator.STATEMENT_SUFFIX) {
        xfix1 += generator.injectId(generator.STATEMENT_SUFFIX, block);
    }
    if (xfix1) {
        xfix1 = generator.prefixLines(xfix1, generator.INDENT);
    }
    let loopTrap = '';
    if (generator.INFINITE_LOOP_TRAP) {
        loopTrap = generator.prefixLines(
            generator.injectId(generator.INFINITE_LOOP_TRAP, block),
            generator.INDENT,
        );
    }
    let branch = '';
    if (block.getInput('STACK')) {
        // The 'procedures_defreturn' block might not have a STACK input.
        branch = generator.statementToCode(block, 'STACK');
    }
    let returnValue = '';
    if (block.getInput('RETURN')) {
        // The 'procedures_defnoreturn' block (which shares this code)
        // does not have a RETURN input.
        returnValue = generator.valueToCode(block, 'RETURN', javascript.Order.NONE) || '';
    }
    let xfix2 = '';
    if (branch && returnValue) {
        // After executing the function body, revisit this block for the return.
        xfix2 = xfix1;
    }
    if (returnValue) {
        returnValue = generator.INDENT + 'return ' + returnValue + ';\n';
    }
    const args = [];
    const variables = block.getVars();
    for (let i = 0; i < variables.length; i++) {
        args[i] = generator.getVariableName(variables[i]);
    }
    let code =
        'async function ' +
        funcName +
        '(' +
          args.join(', ') +
          ') {\n' +
              xfix1 +
              loopTrap +
              branch +
              xfix2 +
              returnValue +
              '}';
    code = generator.scrub_(block, code);
    (generator as any).definitions_['%' + funcName] = code;
    return null;
}
javascript.javascriptGenerator.forBlock["procedures_defreturn"] = procedures_defreturn;
javascript.javascriptGenerator.forBlock["procedures_defnoreturn"] = procedures_defreturn;

export function procedures_callreturn(
    block: Blockly.Block,
    generator: javascript.JavascriptGenerator,
): [string, javascript.Order] {
    // Call a procedure with a return value.
    const funcName = generator.getProcedureName(block.getFieldValue('NAME'));
    const args = [];
    const variables = block.getVars();
    for (let i = 0; i < variables.length; i++) {
        args[i] = generator.valueToCode(block, 'ARG' + i, javascript.Order.NONE) || 'null';
    }
    const code = funcName + '(' + args.join(', ') + ')';
    return [`(await ${code})`, javascript.Order.FUNCTION_CALL];
}

