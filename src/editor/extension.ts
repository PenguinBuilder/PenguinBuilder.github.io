import * as Blockly from "blockly/core";
import * as javascript from "blockly/javascript";
import { FieldColour } from "@blockly/field-colour";
import { FieldAngle } from "@blockly/field-angle";
import { ToolboxInfo } from "blockly/core/utils/toolbox";
import DATA from "./DATA";

export default function(toolbox: ToolboxInfo, workspace: Blockly.WorkspaceSvg, code: string, catid: string) {
    interface PenguinExtension {
        Info(): Category;
        generator: {
            [generator: string]: (block: Block) => string;
        };
    }

    type blockType = {
        kind: "Statement";
    } | {
        kind: "Value";
        type: string | string[];
    } | {
        kind: "Hat";
    };

    interface BlockType {
        opcode: string;
        color?: number|string;
        blockType: blockType;
        args: ArgumentType[];
    }

    type ArgumentType =
        & {
        fields: fieldType[];
    }
    & ({
        kind: "Value";
        type: string | string[];
        ID: string;
    } | {
        kind: "Statement";
        ID: string;
    } | {
        kind: "Dummy";
    });

    interface Block {
        ID: string;
        parent: Block | null;
        top: Block;
        BlocklyBlock: any;
        BlocklyGenerator: any;
        getField: (ID: string) => string;
        getValue: (ID: string) => string;
        getStatement: (ID: string) => string;
    }

    interface Category {
        name: string;
        color: string;
        ID: string;
        blocks: BlockType[];
    }

    type fieldType = {
        kind: "text";
        value: string;
    } | {
        kind: "text_input";
        ID: string;
        default: string;
    } | {
        kind: "number_input";
        ID: string;
        default: number;
    } | {
        kind: "angle_input";
        ID: string;
        default: number;
    } | {
        kind: "menu_input";
        ID: string;
        value: string[] | Record<string, any>;
    } | {
        kind: "checkbox_input";
        ID: string;
        default: boolean;
    } | {
        kind: "color_input";
        ID: string;
        default: string;
    };

    const Penguin = {
        _getType(type: string | string[]): string | string[] | null {
            if (Array.isArray(type)) {
                if(type.includes("Any")) {
                    return null;
                }
                return type;
            } else {
                return type === "Any" ? null : type;
            }
        },
        _setFields(input: any, fields?: fieldType[]) {
            if (Array.isArray(fields)) {
                for (const field of fields) {
                    switch (field.kind) {
                        case "text":
                            input.appendField(field.value);
                        break;
                        case "text_input":
                            input.appendField(
                                new Blockly.FieldTextInput(field.default),
                                field.ID,
                        );
                        break;
                        case "number_input":
                            input.appendField(new Blockly.FieldNumber(field.default), field.ID);
                        break;
                        case "angle_input":
                            input.appendField(new FieldAngle(field.default), field.ID);
                        break;
                        case "menu_input":
                            input.appendField(
                                new Blockly.FieldDropdown(this._getMenuItems(field.value)),
                                field.ID,
                        );
                        break;
                        case "checkbox_input":
                            input.appendField(
                                new Blockly.FieldCheckbox(field.default ? "TRUE" : "FALSE"),
                                field.ID,
                        );
                        break;
                        case "color_input":
                            input.appendField(new FieldColour(field.default), field.ID);
                        break;
                    }
                }
            }
        },
        _getMenuItems(value: string[] | Record<string, string>): Blockly.MenuGenerator {
            if (Array.isArray(value)) {
                return value.map((v) => [v, v]);
            } else {
                return Object.entries(value);
            }
        },
        LoadExtension(Extension: new () => PenguinExtension) {
            const ext = new Extension();
            const inf = ext.Info();
            const id = inf.ID;
            const callback = "Remove_Extension_"+catid;
            const blocks: any[] = [
                {
                    "kind": "button",
                    "text": `Remove ${inf.name}`,
                    "callbackKey": callback,
                }
            ];

            workspace.registerButtonCallback(callback, () => {
                const i = toolbox.contents.findIndex(v=>(v as any).id == catid);
                delete DATA.extensions[catid];
                toolbox.contents.splice(i);
                workspace.updateToolbox(toolbox);
                workspace.refreshToolboxSelection();
            });
            const self = this;
            toolbox.contents.push(
                {
                    kind: "category",
                    name: inf.name,
                    colour: inf.color,
                    contents: blocks,
                    id: catid,
                }
            );
            for (const _block of inf.blocks) {
                const name = `${id}_${_block.blockType.kind}_${_block.opcode}`;
                blocks.push({
                    kind: "block",
                    type: name,
                    gap: 8,
                });
                Blockly.Blocks[name] = {
                    init: function (this: Blockly.Block) {
                        if (_block.blockType.kind === "Statement") {
                            this.setPreviousStatement(true, null);
                            this.setNextStatement(true, null);
                        } else if (_block.blockType.kind === "Value") {
                            this.setOutput(
                                true,
                                self._getType(_block.blockType.type),
                            );
                        }
                        for (const arg of _block.args) {
                            switch (arg.kind) {
                                case "Statement":
                                    self._setFields(
                                        this.appendStatementInput(arg.ID)
                                        .setCheck(null),
                                        arg.fields,
                                );
                                break;
                                case "Value":
                                    self._setFields(
                                        this.appendValueInput(arg.ID)
                                        .setCheck(self._getType(arg.type)),
                                        arg.fields,
                                );
                                break;
                                case "Dummy":
                                    self._setFields(
                                        this.appendDummyInput(),
                                        arg.fields,
                                );
                                break;
                            }
                        }
                        this.setColour(_block.color??inf.color);
                        this.setTooltip("");
                        this.setHelpUrl("");
                    },
                };
                javascript.javascriptGenerator.forBlock[name] = function(block: any, generator: any) {
                    const code = ext.generator[_block.opcode](new self.Block(block, generator));
                    if(_block.blockType.kind === "Value") {
                        return [code, javascript.Order.ATOMIC];
                    } else {
                        return code;
                    }
                }
            }
            workspace.updateToolbox(toolbox);
            workspace.refreshToolboxSelection();
        },
        Block: class Block implements Block {
            constructor(public BlocklyBlock: any, public BlocklyGenerator: any) {
            }
            getField(ID: string): string {
                return this.BlocklyBlock.getFieldValue(ID) + "";
            }
            getValue(ID: string): string {
                return this.BlocklyGenerator?.valueToCode(this.BlocklyBlock, ID, javascript.Order.ATOMIC) + "";
            }
            getStatement(ID: string): string {
                return this.BlocklyGenerator?.statementToCode(this.BlocklyBlock, ID) + "";
            }
            get parent(): Block | null {
                if(this.BlocklyBlock.parentBlock_ === null) return null;
                return new Penguin.Block(this.BlocklyBlock.parentBlock_, undefined);
            }
            get top(): Block {
                if (this.parent === null) {
                    return this;
                }
                return this.parent.top;
            }
            get ID(): string {
                return this.BlocklyBlock.type;
            }
        },
        blockType: {
            Statement(): blockType {
                return { kind: "Statement" } as blockType;
            },
            Value(type: string | string[]): blockType {
                return { kind: "Value", type } as blockType;
            },
            Hat(): blockType {
                return { kind: "Hat" } as blockType;
            },
        },
        Argument: {
            Value(
                ID: string,
                type: string | string[],
                fields: fieldType[] = [],
            ): ArgumentType {
                    return { kind: "Value", ID, type, fields } as ArgumentType;
                },
                Statement(ID: string, fields: fieldType[] = []): ArgumentType {
                    return { kind: "Statement", ID, fields } as ArgumentType;
                },
                Dummy(fields: fieldType[] = []): ArgumentType {
                    return { kind: "Dummy", fields } as ArgumentType;
                },
        },
        Field: {
            Text(value: string): fieldType {
                return { kind: "text", value } as fieldType;
            },
            TextInput(ID: string, _default: string = ""): fieldType {
                return { kind: "text_input", ID, default: _default } as fieldType;
            },
            NumberInput(ID: string, _default: number = 0): fieldType {
                return { kind: "number_input", ID, default: _default } as fieldType;
            },
            AngleInput(ID: string, _default: number = 0): fieldType {
                return { kind: "angle_input", ID, default: _default } as fieldType;
            },
            MenuInput(ID: string, items: string[] | Record<string, any>): fieldType {
                return { kind: "menu_input", ID, value: items } as fieldType;
            },
            CheckboxInput(ID: string, _default: boolean = true): fieldType {
                return { kind: "checkbox_input", ID, default: _default } as fieldType;
            },
            ColorInput(ID: string, _default: string = "#FFFFFF"): fieldType {
                return { kind: "color_input", ID, default: _default } as fieldType;
            },
        },
    };
    (new Function("Penguin", code))(Penguin);
}
