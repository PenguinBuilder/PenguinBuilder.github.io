import * as Blockly from "blockly/core";
import * as javascript from "blockly/javascript";
// extended from blockly's implentation
Blockly.Blocks["logic_compare"] = {
    init: function(this:Blockly.Block) {
        this.appendValueInput('A')
        this.appendValueInput('B')
        .appendField(new Blockly.FieldDropdown([
            ['=', 'EQ'],
                ['\u2260', 'NEQ'],
            ['\u200F<', 'LT'],
            ['\u200F\u2264', 'LTE'],
            ['\u200F>', 'GT'],
            ['\u200F\u2265', 'GTE'],
            ['\u2261', "FEQ"],
            ['\u2262', "NFEQ"],
        ]), 'OP');
        this.setStyle("logic_blocks");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL)
    },
};


javascript.javascriptGenerator.forBlock["logic_compare"] = function (block, generator){
    const OPERATORS = {
        'EQ': '==',
        'NEQ': '!=',
            'LT': '<',
        'LTE': '<=',
            'GT': '>',
        'GTE': '>=',
            'FEQ': "===",
        'NFEQ': "!==",
    };
    type OperatorOption = keyof typeof OPERATORS;
    const operator = OPERATORS[block.getFieldValue('OP') as OperatorOption];
    const order =
        operator === '==' || operator === '!=' || operator === "===" || operator === "!==" ? javascript.Order.EQUALITY : javascript.Order.RELATIONAL;
    const argument0 = generator.valueToCode(block, 'A', order) || '0';
    const argument1 = generator.valueToCode(block, 'B', order) || '0';
    const code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
}


Blockly.Blocks["logic_switch_case_mutator"] = {
    init: function(this: Blockly.Block) {
        this.appendDummyInput().appendField("case")
        this.setStyle("logic_blocks");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

Blockly.Blocks["logic_switch_default_mutator"] = {
    init: function(this: Blockly.Block) {
        this.appendDummyInput().appendField("default")
        this.setStyle("logic_blocks");
        this.setPreviousStatement(true);
    }
}

Blockly.Blocks["logic_switch_container_mutator"] = {
    init: function(this: Blockly.Block) {
        this.appendStatementInput("STACK").appendField("Switch")
        this.setMovable(false);
        this.setStyle("logic_blocks");
    }
}

Blockly.Blocks["logic_switch"] = {
    init: function(this: Blockly.Block & {updateShape_: ()=>void, hasDefault_: boolean, itemCount_: number}) {
        this.hasDefault_ = false;
        this.itemCount_ = 1;
        this.appendValueInput("VALUE").appendField("switch")
        this.setStyle("logic_blocks");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.icons.MutatorIcon([
            "logic_switch_case_mutator",
            "logic_switch_default_mutator",
        ], this as any as Blockly.BlockSvg));
        this.updateShape_();
    },
    saveExtraState: function() {
        return {
            'itemCount': this.itemCount_,
            'hasDefault': this.hasDefault_,
        };
    },
    loadExtraState: function(state: {itemCount: number, hasDefault: boolean}) {
        this.itemCount_ = state['itemCount'] ?? 1;
        this.hasDefault_ = state['hasDefault'] ?? false;
        this.updateShape_();
    },
    updateShape_(this: Blockly.Block & {itemCount_: number, hasDefault_: boolean}) {
        let i = 0;
        while (this.getInput(`C${i}`)) {
            this.removeInput(`C${i}`);
            this.removeInput(`S${i}`);
            i++;
        }
        this.removeInput("D", true) 
        this.removeInput("DI", true) 
        for(let i = 0; i < this.itemCount_; i++) {
            this.appendValueInput(`C${i}`).appendField("case").setAlign(Blockly.inputs.Align.RIGHT);
            this.appendStatementInput(`S${i}`);
        }

        if(this.hasDefault_) {
            this.appendDummyInput("DI").appendField("default").setAlign(Blockly.inputs.Align.RIGHT);
            this.appendStatementInput("D");
        }
    } ,
    decompose: function(workspace: Blockly.WorkspaceSvg) {
        const container = workspace.newBlock("logic_switch_container_mutator");
        container.initSvg();

        let connection = container.getInput("STACK")!.connection;
        for (let i = 0; i < this.itemCount_; i++) {
            const item = workspace.newBlock("logic_switch_case_mutator");
            item.initSvg();
            connection!.connect(item.previousConnection);
            connection = item.nextConnection;
        }
        if(this.hasDefault_) {
            const item = workspace.newBlock("logic_switch_default_mutator");
            item.initSvg();
            connection!.connect(item.previousConnection);
            connection = item.nextConnection;
        }

        return container;
    },
    compose: function(topBlock: Blockly.Block) {
        let itemBlock = topBlock.getInputTargetBlock("STACK");
        const connections: (Blockly.Connection | null)[] = [];
        const connectionsS: (Blockly.Connection | null)[] = [];
        let connectionD: Blockly.Connection | null = null;

        this.hasDefault_ = false;
        while (itemBlock) {
            if(itemBlock.type === "logic_switch_default_mutator") {
                this.hasDefault_ = true;
                connectionD = (itemBlock as any).defaultConnection_ ?? null;
                break;
            }
            connections.push((itemBlock as any).caseConnection_ ?? null);
            connectionsS.push((itemBlock as any).statementConnection_ ?? null);
            itemBlock = itemBlock.nextConnection?.targetBlock() ?? null;
        }

        this.itemCount_ = connections.length;
        this.updateShape_();

        // Reconnect saved connections
        for (let i = 0; i < connections.length; i++) {
            if (connections[i]) {
                this.getInput(`C${i}`)!
                .connection!
                .connect(connections[i]!);
            }
            if(connectionsS[i]) {
                this.getInput(`S${i}`)!
                .connection!
                .connect(connectionsS[i]!);
            }
        }
        if(connectionD) {
            this.getInput(`D`)!
            .connection!
            .connect(connectionD!);
        }
    },
    saveConnections: function(topBlock: Blockly.Block) {
        let itemBlock = topBlock.getInputTargetBlock("STACK");
        let i = 0;

        while (itemBlock) {
            if(itemBlock.type === "logic_switch_default_mutator") {
                const input = this.getInput(`D`);
                (itemBlock as any).defaultConnection_ = input?.connection?.targetConnection ?? null;
                break;
            }
            const input = this.getInput(`C${i}`);
            (itemBlock as any).caseConnection_ = input?.connection?.targetConnection ?? null;
            {
                const input = this.getInput(`S${i}`);
                (itemBlock as any).statementConnection_ = input?.connection?.targetConnection ?? null;
            }
            i++;
            itemBlock = itemBlock.nextConnection?.targetBlock() ?? null;
        }
    }
}

javascript.javascriptGenerator.forBlock["logic_switch"] = function(block, generator) {
    const v = generator.valueToCode(block, "VALUE", javascript.Order.ATOMIC);
    let code = `switch(${v}) {`;
        for(let i = 0; i < (block as any).itemCount_; i++) {
            const c = generator.valueToCode(block, "C" + i, javascript.Order.ATOMIC);
            const s = generator.statementToCode(block, "S" + i);
            code += `case (${c}): {
                ${s}
            }
            ` 
        }
        if((block as any).hasDefault_) {
            const s = generator.statementToCode(block, "D");
            code += `default: {
                ${s}
            }
            ` 
        }
        code += "}";
        return code;
}


Blockly.Blocks["logic_switch_expr"] = {
    init: function(this: Blockly.Block & {updateShape_: ()=>void, hasDefault_: boolean, itemCount_: number}) {
        this.hasDefault_ = false;
        this.itemCount_ = 1;
        this.appendValueInput("VALUE").appendField("switch")
        this.appendEndRowInput();
        this.setStyle("logic_blocks");
        this.setOutput(true)
        this.setInputsInline(true);
        this.setMutator(new Blockly.icons.MutatorIcon([
            "logic_switch_case_mutator",
            "logic_switch_default_mutator",
        ], this as any as Blockly.BlockSvg));
        this.updateShape_();
    },
    saveExtraState: function() {
        return {
            'itemCount': this.itemCount_,
            'hasDefault': this.hasDefault_,
        };
    },
    loadExtraState: function(state: {itemCount: number, hasDefault: boolean}) {
        this.itemCount_ = state['itemCount'] ?? 1;
        this.hasDefault_ = state['hasDefault'] ?? false;
        this.updateShape_();
    },
    updateShape_(this: Blockly.Block & {itemCount_: number, hasDefault_: boolean}) {
        let i = 0;
        while (this.getInput(`C${i}`)) {
            this.removeInput(`C${i}`);
            this.removeInput(`S${i}`);
            this.removeInput(`A${i}`);
            i++;
        }
        this.removeInput("D", true) 
        for(let i = 0; i < this.itemCount_; i++) {
            this.appendValueInput(`C${i}`).appendField("case").setAlign(Blockly.inputs.Align.RIGHT);
            this.appendValueInput(`S${i}`).setAlign(Blockly.inputs.Align.RIGHT).appendField(":");
            this.appendEndRowInput(`A${i}`);
        }

        if(this.hasDefault_) {
            this.appendValueInput("D").appendField("default").setAlign(Blockly.inputs.Align.RIGHT);
        }
    } ,
    decompose: function(workspace: Blockly.WorkspaceSvg) {
        const container = workspace.newBlock("logic_switch_container_mutator");
        container.initSvg();

        let connection = container.getInput("STACK")!.connection;
        for (let i = 0; i < this.itemCount_; i++) {
            const item = workspace.newBlock("logic_switch_case_mutator");
            item.initSvg();
            connection!.connect(item.previousConnection);
            connection = item.nextConnection;
        }
        if(this.hasDefault_) {
            const item = workspace.newBlock("logic_switch_default_mutator");
            item.initSvg();
            connection!.connect(item.previousConnection);
            connection = item.nextConnection;
        }

        return container;
    },
    compose: function(topBlock: Blockly.Block) {
        let itemBlock = topBlock.getInputTargetBlock("STACK");
        const connections: (Blockly.Connection | null)[] = [];
        const connectionsS: (Blockly.Connection | null)[] = [];
        let connectionD: Blockly.Connection | null = null;

        this.hasDefault_ = false;
        while (itemBlock) {
            if(itemBlock.type === "logic_switch_default_mutator") {
                this.hasDefault_ = true;
                connectionD = (itemBlock as any).defaultConnection_ ?? null;
                break;
            }
            connections.push((itemBlock as any).caseConnection_ ?? null);
            connectionsS.push((itemBlock as any).statementConnection_ ?? null);
            itemBlock = itemBlock.nextConnection?.targetBlock() ?? null;
        }

        this.itemCount_ = connections.length;
        this.updateShape_();

        // Reconnect saved connections
        for (let i = 0; i < connections.length; i++) {
            if (connections[i]) {
                this.getInput(`C${i}`)!
                .connection!
                .connect(connections[i]!);
            }
            if(connectionsS[i]) {
                this.getInput(`S${i}`)!
                .connection!
                .connect(connectionsS[i]!);
            }
        }
        if(connectionD) {
            this.getInput(`D`)!
            .connection!
            .connect(connectionD!);
        }
    },
    saveConnections: function(topBlock: Blockly.Block) {
        let itemBlock = topBlock.getInputTargetBlock("STACK");
        let i = 0;

        while (itemBlock) {
            if(itemBlock.type === "logic_switch_default_mutator") {
                const input = this.getInput(`D`);
                (itemBlock as any).defaultConnection_ = input?.connection?.targetConnection ?? null;
                break;
            }
            const input = this.getInput(`C${i}`);
            (itemBlock as any).caseConnection_ = input?.connection?.targetConnection ?? null;
            {
                const input = this.getInput(`S${i}`);
                (itemBlock as any).statementConnection_ = input?.connection?.targetConnection ?? null;
            }
            i++;
            itemBlock = itemBlock.nextConnection?.targetBlock() ?? null;
        }
    }
}

javascript.javascriptGenerator.forBlock["logic_switch_expr"] = function(block, generator) {
    const v = generator.valueToCode(block, "VALUE", javascript.Order.ATOMIC);
    let code = `(await (async ()=>{switch(${v}) {`;
                 for(let i = 0; i < (block as any).itemCount_; i++) {
                     const c = generator.valueToCode(block, "C" + i, javascript.Order.ATOMIC);
                     const s = generator.valueToCode(block, "S" + i, javascript.Order.ATOMIC);
                     code += `case (${c}): {
                         return ${s};
                     }
                     ` 
                 }
                 if((block as any).hasDefault_) {
                     const s = generator.valueToCode(block, "D", javascript.Order.ATOMIC);
                     code += `default: {
                         return ${s}
                     }
                     ` 
                 }
                 code += "}})())";
                 return code;
}

Blockly.Blocks["logic_switch_break"] = {
    init: function(this: Blockly.Block) {
        this.appendDummyInput().appendField("break")
        this.setStyle("logic_blocks");
        this.setPreviousStatement(true);
    }
}

javascript.javascriptGenerator.forBlock["logic_switch_break"] = function() {
    return "break;\n";
}

// redefined from blockly github
Blockly.Blocks["logic_boolean"] = {
    init: function(this: Blockly.Block) {
        this.appendDummyInput().appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.LOGIC_BOOLEAN_TRUE, 'TRUE'],
            [Blockly.Msg.LOGIC_BOOLEAN_FALSE, 'FALSE'],
            ["random", 'RANDOM'],
        ]), "BOOL")   
        this.setOutput(true, "Boolean");
        this.setStyle("logic_blocks");
        this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP)
        this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL)
    },
}
javascript.javascriptGenerator.forBlock["logic_boolean"] = function (block, generator) {
    const b = block.getFieldValue('BOOL');
    if(b === "RANDOM") {
        return ['(Math.round(Math.random()) === 1)', javascript.Order.ATOMIC]
    }
    const code = b === 'TRUE' ? 'true' : 'false';
    return [code, javascript.Order.ATOMIC];
}
