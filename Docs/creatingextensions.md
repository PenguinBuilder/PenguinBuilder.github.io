[//]: # (this was generated with chatgpt and was reviewed before committing)
# Creating Extensions
## Interface: PenguinExtension
**typscript is recommended for creating extensions**
this is recommended for simple extensions, but default Blockly allows for more complex extensions, you can find the docs for that [here](https://developers.google.com/blockly/reference/js/blockly)
### `Info(): Category`
Returns information about the extension.

### `generator: { [generator: string]: (block: Block) => string; }`
An object containing generator functions for different blocks.
___
## Type: blockType

Represents different types of blocks.

### Properties:

- `kind`: One of "Statement", "Value", or "Hat".
- `type`: Optional. Specifies the type of value the block returns.
___
## Interface: BlockType

Represents a specific type of block.

### Properties:

- `opcode`: The unique identifier for the block.
- `color`: The color of the block.
- `blockType`: The type of the block.
- `args`: An array of ArgumentType objects representing the arguments of the block.
___
## Interface: Block

Represents a block.

### Properties:

- `ID`: The unique identifier of the block.
- `parent`: The parent block.
- `top`: The top-level block.
- `BlocklyBlock`: The Blockly block object.
- `BlocklyGenerator`: The Blockly generator object.

### Methods:

- `getField(ID: string): string`: Retrieves the value of a field by its ID.
- `getValue(ID: string): string`: Retrieves the value of an argument by its ID.
- `getStatement(ID: string): string`: Retrieves the value of a statement by its ID.
___
## Interface: Category

Represents a category of blocks.

### Properties:

- `name`: The name of the category.
- `color`: The color of the category.
- `ID`: The unique identifier of the category.
- `blocks`: An array of BlockType objects representing the blocks in the category.
___
## Type: fieldType

Represents the type of a field.

### Properties:

- `kind`: One of "text", "text_input", "number_input", "angle_input", "menu_input", "checkbox_input", or "color_input".
- `value`: The value of the field.
- `ID`: The unique identifier of the field.
- `default`: The default value of the field.
___
## Constant: Penguin

An object containing utility functions and methods related to the Penguin extension.

### Creator Functions:

- `LoadExtension(Extension: new () => PenguinExtension)`: Loads an extension.
- `blockType.Statement(): blockType`: Creates a statement block type.
- `blockType.Value(type: string | string[]): blockType`: Creates a value block type.
- `blockType.Hat(): blockType`: Creates a hat block type.
- `Argument.Value(ID: string, type: string | string[], fields: fieldType[]): ArgumentType`: Creates a value argument.
- `Argument.Statement(ID: string, fields: fieldType[]): ArgumentType`: Creates a statement argument.
- `Argument.Dummy(fields: fieldType[]): ArgumentType`: Creates a dummy argument.
- `Field.Text(value: string): fieldType`: Creates a text field.
- `Field.TextInput(ID: string, _default: string): fieldType`: Creates a text input field.
- `Field.NumberInput(ID: string, _default: number): fieldType`: Creates a number input field.
- `Field.AngleInput(ID: string, _default: number): fieldType`: Creates an angle input field.
- `Field.MenuInput(ID: string, items: string[] | Record<string, any>): fieldType`: Creates a menu input field.
- `Field.CheckboxInput(ID: string, _default: boolean): fieldType`: Creates a checkbox input field.
- `Field.ColorInput(ID: string, _default: string): fieldType`: Creates a color input field.
___
## Types
* Any
* String
* Boolean
* Number
* Array
* Object
* Function
**you can also add other types specific to you r extension**
___
