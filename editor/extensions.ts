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
  color: number;
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

declare function category(name: string, color: string, contents: any[]): any;

declare const toolbox: {
  contents: any[];
};

declare const Blockly: any;
declare const javascript: any;

declare const workspace: any;
declare function block(name: string): any;

const Penguin = {
  _getType(type: string | string[]) {
    if (Array.isArray(type)) {
      return type.map((v) => v === "Any" ? null : v);
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
            input.appendField(new Blockly.FieldAngle(field.default), field.ID);
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
            input.appendField(new Blockly.FieldColour(field.default), field.ID);
            break;
        }
      }
    }
  },
  _getMenuItems(value: string[] | Record<string, any>): any[][] {
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
    const blocks: any[] = [];
    const self = this;
    toolbox.contents.push(
      category(inf.name, inf.color, blocks),
    );
    for (const _block of inf.blocks) {
      const name = `${id}_${_block.blockType.kind}_${_block.opcode}`;
      blocks.push(block(name));
      Blockly.Blocks[name] = {
        init: function () {
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
          this.setColour(_block.color);
          this.setTooltip("");
          this.setHelpUrl("");
        },
      };
      javascript.javascriptGenerator.forBlock[name] = function(block: any, generator: any) {
        const code = ext.generator[_block.opcode](new self.Block(block, generator));
        if(_block.blockType.kind === "Value") {
          return [code, Blockly.JavaScript.ORDER_ATOMIC];
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
