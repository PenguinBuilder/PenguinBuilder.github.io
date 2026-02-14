import * as Blockly from "blockly/core"
import * as javascript from "blockly/javascript";

Blockly.Blocks["json_new"] = {
    init: function(this: Blockly.Block & {updateShape_: ()=>any, itemCount_:number}) {
        this.itemCount_ = 3;
        this.setOutput(true, 'Object');
        this.setTooltip('');
        this.setHelpUrl('');
        this.setStyle("json_blocks");
        this.setMutator(new Blockly.icons.MutatorIcon([
            "json_kv_mutator",
        ], this as any as Blockly.BlockSvg));
        this.updateShape_();
    },
    saveExtraState: function() {
        return {
            'itemCount': this.itemCount_,
        };
    },
    loadExtraState: function(state: {itemCount: number}) {
        this.itemCount_ = state['itemCount'] ?? 3;
        this.updateShape_();
    },
    updateShape_: function(this: Blockly.Block & {itemCount_: number}) {
        let i = 0;
        while (this.getInput(`V${i}`)) {
            this.removeInput(`V${i}`);
            this.removeInput(`K${i}`);
            this.removeInput(`A${i}`);
            i++;
        }
        this.removeInput("Cont", true)
        if(this.itemCount_ === 0) {
            this.appendDummyInput('Cont')
            .appendField(new Blockly.FieldLabelSerializable('Empty JSON Object'), 'Block');
        }

        for (let i = 0; i < this.itemCount_; i++) {
            this.appendValueInput(`K${i}`).setAlign(Blockly.inputs.Align.RIGHT).setCheck("String");
            this.appendValueInput(`V${i}`).appendField(":");
            this.appendEndRowInput(`A${i}`);
        }
        if(this.itemCount_ > 0) {
            this.getInput("K0")?.appendField("JSON from") 
        }
    },
    decompose: function(workspace: Blockly.WorkspaceSvg) {
        const container = workspace.newBlock("json_new_container");
        container.initSvg();

        let connection = container.getInput("STACK")!.connection;
        for (let i = 0; i < this.itemCount_; i++) {
            const item = workspace.newBlock("json_kv_mutator");
            item.initSvg();
            connection!.connect(item.previousConnection);
            connection = item.nextConnection;
        }

        return container;
    },
    compose: function(topBlock: Blockly.Block) {
        let itemBlock = topBlock.getInputTargetBlock("STACK");
        const connectionsV: (Blockly.Connection | null)[] = [];
        const connectionsK: (Blockly.Connection | null)[] = [];

        while (itemBlock) {
            connectionsV.push((itemBlock as any).valueConnection_ ?? null);
            connectionsK.push((itemBlock as any).keyConnection_??null);
            itemBlock = itemBlock.nextConnection?.targetBlock() ?? null;
        }

        this.itemCount_ = connectionsV.length;
        this.updateShape_();

        // Reconnect saved connections
        for (let i = 0; i < connectionsV.length; i++) {
            if (connectionsV[i]) {
                this.getInput(`V${i}`)!
                .connection!
                .connect(connectionsV[i]!);
            }
            if (connectionsK[i]) {
                this.getInput(`K${i}`)!
                .connection!
                .connect(connectionsK[i]!);
            }
        }
    },
    saveConnections: function(topBlock: Blockly.Block) {
        let itemBlock = topBlock.getInputTargetBlock("STACK");
        let i = 0;

        while (itemBlock) {
            const input = this.getInput(`V${i}`);
            (itemBlock as any).valueConnection_ = input?.connection?.targetConnection ?? null;
            {
                const input = this.getInput(`K${i}`);
                (itemBlock as any).keyConnection_ = input?.connection?.targetConnection ?? null;
            }
            i++;
            itemBlock = itemBlock.nextConnection?.targetBlock() ?? null;
        }
    }
};

Blockly.Blocks["json_new_container"] = {
    init: function(this: Blockly.Block) {
        this.appendDummyInput('NAME')
        .appendField(new Blockly.FieldLabelSerializable('JSON'), 'Block');
        this.appendStatementInput('STACK');
        this.setTooltip('');
        this.setHelpUrl('');
        this.setMovable(false);
        this.setStyle("json_blocks")
    }
};

Blockly.Blocks["json_kv_mutator"] =  {
    init: function(this: Blockly.Block) {
        this.appendDummyInput('NAME').appendField("Key")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setStyle("json_blocks");
    }
}

javascript.javascriptGenerator.forBlock['json_new'] = function (block: Blockly.Block, generator) {
    let code = "({";
                 for(let i = 0; i < (block as any).itemCount_; i++) {
                     const K = generator.valueToCode(block, `K${i}`, javascript.Order.ATOMIC);
                     const V = generator.valueToCode(block, `V${i}`, javascript.Order.ATOMIC);
                     code+= `${K}: ${V},`;
                 }
                 code += "})"
                 return [code, javascript.Order.ATOMIC]
}

Blockly.Blocks["json_get"] = {
    init: function() {
        this.appendValueInput('JSON')
        .setCheck('Object')
        .appendField('In JSON');
        this.appendValueInput('KEY')
        .setCheck('String')
        .appendField('get');
        this.setInputsInline(true)
        this.setOutput(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setStyle("json_blocks");
    }
};

javascript.javascriptGenerator.forBlock["json_get"] = function(block, generator) {
    const json = generator.valueToCode(block, "JSON", javascript.Order.ATOMIC);
    const key = generator.valueToCode(block, "KEY", javascript.Order.ATOMIC);
    const code = `(${json}[${key}])`;
    return [code, javascript.Order.ATOMIC];
}

Blockly.Blocks["json_set"] = {
    init: function(this: Blockly.Block) {
        this.appendValueInput('JSON')
        .setCheck('Object')
        .appendField('In JSON');
        this.appendValueInput('KEY')
        .setCheck('String')
        .appendField('set');
        this.appendValueInput('VALUE')
        .appendField('to');
        this.setInputsInline(true)
        this.setPreviousStatement(true)
        this.setNextStatement(true)
        this.setTooltip('');
        this.setHelpUrl('');
        this.setStyle("json_blocks");
    }
};

javascript.javascriptGenerator.forBlock["json_set"] = function(block, generator) {
    const json = generator.valueToCode(block, "JSON", javascript.Order.ATOMIC);
    const key = generator.valueToCode(block, "KEY", javascript.Order.ATOMIC);
    const value = generator.valueToCode(block, "VALUE", javascript.Order.ATOMIC);
    const code = `${json}[${key}]=${value};`;
    return code;
}

Blockly.Blocks["json_encode"] = {
    init: function(this: Blockly.Block) {
        this.appendDummyInput().appendField("JSON").appendField(new Blockly.FieldDropdown([
            ["parse", "parse"],
            ["stringify", "stringify"],
        ], (n)=> {
            if(n === "parse") {
                this.setOutput(true, "Object")
            } else {
                this.setOutput(true, "string")
            }
            return n;
        }), "FUN");
        this.appendValueInput("JSON").setCheck("Object");
        this.setInputsInline(true)
        this.setOutput(true, "Object")
        this.setTooltip('');
        this.setHelpUrl('');
        this.setStyle("json_blocks");
    }
};

javascript.javascriptGenerator.forBlock["json_encode"] = function(block, generator) {
    const json = generator.valueToCode(block, "JSON", javascript.Order.ATOMIC);
    const fun = block.getFieldValue("FUN");
    const code = `(JSON.${fun}(${json}))`;
    return [code, javascript.Order.ATOMIC];
}

Blockly.Blocks["json_entries"] = {
    init: function(this: Blockly.Block) {
        this.appendDummyInput().appendField("Get").appendField(new Blockly.FieldDropdown([
            ["keys", "keys"],
            ["values", "values"],
            ["entries", "entries"],
        ]), "FUN");
        this.appendValueInput("JSON").setCheck("Object").appendField("from");
        this.setInputsInline(true)
        this.setOutput(true, 'Array')
        this.setTooltip('');
        this.setHelpUrl('');
        this.setStyle("json_blocks");
    }
}

javascript.javascriptGenerator.forBlock["json_entries"] = function(block, generator) {
    const json = generator.valueToCode(block, "JSON", javascript.Order.ATOMIC);
    const fun = block.getFieldValue("FUN");
    const code = `(Object.${fun}(${json}))`;
    return [code, javascript.Order.ATOMIC];
}

Blockly.Blocks["json_has_key"] = {
    init: function(this: Blockly.Block) {
        this.appendValueInput("KEY").setCheck("String").appendField("Does key");
        this.appendValueInput("OBJ").setCheck("Object").appendField("exist in");
        this.setOutput(true, "Boolean");
        this.setInputsInline(true);
        this.setStyle("json_blocks");
    }
};

javascript.javascriptGenerator.forBlock["json_has_key"] = function(block, generator) {
    const json = generator.valueToCode(block, "OBJ", javascript.Order.ATOMIC);
    const key = block.getFieldValue("KEY");
    const code = `(${key} in ${json})`;
    return [code, javascript.Order.ATOMIC];
}
