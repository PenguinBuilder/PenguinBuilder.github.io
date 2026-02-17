# [#6C9ACE] Block
___
## Create Block
creates a block in your extension  
![create block](./images/create_block.json)
### Arguments
- ID: the ID that the block goes by, **make sure the id is unique to other blocks**
- Text: the display name of the block, put any inputs in brackets image of block
- Show monitor: a boolean value representing weather to show the scratch monitor(wont work unless block is a reporter)
- type: the type of block you want to make
    - block: a block that doesn't
    - reporter: a block that returns a value
    - boolean: a block that returns a boolean
- Inputs: an area to put inputs for the block, accepts
    - Create Input
    - Create Input Menu
    - Create Input From Menu
- function: the input to run the function that the block will run
___
## Create Input
Creates an input of a specific type, which does not include menus
### Arguments
- ID: the ID of the Input(make sure the id is **unique** to other inputs)
- type: the type of the value excepted
    - string
    - number
    - boolean
    - empty: a type that forces you to use a variable
    - color
    - costume
    - sound
    - angle
    - note
    - matrix
- default text: the default value of the input(if the type supports it)
___
## Create Input Menu
Creates a Menu  
![create input menu](./images/create_input_menu.json)
### Arguments
- ID: the ID of the input(make sure the id is **unique** to other inputs)
- Accept Reporters: a boolean on weather the input allows Reporters
- Menu: An Array that represents the menu(Accepts a string or a menu item) 
___
## Create Menu
like "Create Input Menu", this block will create a menu, but it can be used more than once  
![create menu](./images/create_menu.json) 
### Arguments
- ID: the ID of the menu(make sure the id is **unique** to other menus)
- Accept Reporters: a boolean on weather the input allows Reporters
- Menu: An Array that represents the menu(Accepts a string or a menu item) image of block
___
## Create Dynamic Menu
create a menu similar to "Create Menu" but its dynamic  
![create dynamic menu](./images/create_dynamic_menu.json)
### Arguments
- ID: the ID of the menu(make sure the id is **unique** to other menus)
- Accept Reporters: a boolean on weather the input allows Reporters
- Function: a statement for the menu(make sure it **returns** an array) image of block
___
## Create Input From Menu
creates an input from a menu created will "Create Menu"  
![create input from menu](./images/create_input_from_menu.json)
### Arguments
- ID: the ID of the input(make sure the id is **unique** to other inputs)
- Menu ID: The ID of the menu you want to use(make sure the Menu ID is the same and the ID of the menu) image of block
___
## Menu Item
creates a menu item returns: Object
### Arguments
text: the text that the menu shows
value: the value the item returns when getting the Input
___
## Get Input
gets a value of an input and returns it

### Arguments
Input ID: the ID of the input you want
___
## Return
returns from a block

### Arguments
value: the return value
___
## Create Hat
creates a Hat Block  
![create hat](./images/create_hat.json)
### Arguments
ID: the ID of the Hat(make sure the ID is **unique** to other Hats)
Text: the display name of the block, put any inputs in brackets image of block
___
## Call Hat/ Call Hat With Args
calls a hat block through the scratch vm(make sure the extension is unsandboxed)  
![call hat](./images/call_hat.json)
### Arguments
ID: the ID of the Hat you want to call
Args(for Call Hat With Args only): an Object that represents the inputs in the hat
__
# [#8D46AC] Category 
___
## Order Category
only use one of these blocks in a project it will sort the category to be in any order you want  
![order category](./images/order_category.json)
___
## Create Label
creates a label in the position you want

### Arguments
text: the text you want to show
___
## Create Button
creates a button in the position you want

### Arguments
text: the text you want on the button
onlick: the function the button runs when you click it
___
## Use Block
puts a block in a location you want

### Arguments
id: the id of the block
___
## Use Hat
puts a hat in a location you want

### Arguments
id: the id of the hat
___
# [#D85450] JSON 
___
## JSON from / Empty JSON Object
a mutator with key values pairs of JSON return *Object*
![JSON from](./images/JSON_from.json)
### Arguments
- Key[n]: string for the key that it expects
- Value[n]: the value for that key
___
## in JSON get
gets a value of a JSON object *returns*: any

Arguments
- Object: the JSON Object you are getting from
- key: the key to the value you want
___
## JSON set
mutates an objects key to a new value
### Arguments
- Object: the Object you are setting a value of
- key: the key that your setting
- value: the value your setting it to
___
## JSON parse\stringify 
parses or stringifies an Object
### Arguments
- Operation: a menu with 2 values
    - Parse: **returns Object**
        takes a JSON string and turns it into an Object
    - stringify **returns String** 
        takes a JSON Object and turns it into a string
- Object: either a JSON string or an Object that you are stringifying
___
## Get from JSON
gets the key, value, or entries of an Object, **returns Array**
- type: a menu for what it fetches
    - Keys: **returns the keys of the Object**
    - Values: **returns the values of the Object**
    - Keys: **returns the entries of the Object** as an Array of an Array with the key and value
- Object: the object it gets it from
___
## Does Key exist in
checks if a key exists in the object **returns Boolean**
- Object: the object it checks 
___
# [#FF667F] Functions 
___
## Function inline
an inline function **returns whatever the body returns**
there are three types, 2 don't return, 1 does return
___
## Return
returns from an inline function 

### Arguments
value: the return value
___
# [#16BC8B] Controls 
___
## Wait 
waits a given amount of time
### Arguments
- Time: the time it waits in milliseconds
___
## Wait Until 
waits until a boolean is true
### Arguments
- Bool: the Boolean it waits for 
___
## Try
tries to run a code, and returns false if there's an error, returns true if there isn't
___
# [#4D96FF] Logic 
___
## Random
returns a random bool, true or false
___
## Switch
runs code for the first value that matches, with fall-through  
to prevent fall-through, make sure to add break after each case  
![switch](./images/switch.json)
___
## Switch Expression
similar to switch, except it returns a value for the first case that matches the value, and you don't have to worry about fall-through
___
# [#FF5827] Browser 
___
## Console
logs to the console with 4 possible levels
### Arguments 
- level
    - log
    - warn
    - error
    - info
- Value: the value to log
___
## Alert
displays a message to the user

### Arguments
- message: the message displayed to the user
___
## Confirm
displays a message and has the user confirm or deny the message returns: boolean of the users input

### Arguments
- message: the message displayed to the user
___
## Prompt
displays a message as a prompt returns: text value of what the user put

### Arguments
- message: the message displayed to the user
___
# [#FF00FF] Advanced 
___
## Eval: 2 versions
runs javascript there is a reporter version that returns the return value of the inputed code

### Arguments
- value: the code to run
___
## Raw: 2 versions
inserts raw javascript one returns the value of the inserted javascript

### Arguments
value: the code to insert
___
# [#6C747C] Extensions 
___
### Creating Extensions
copy the extensions.d.ts file from this [GitHub](https://github.com/PenguinBuilder/ExtensionGallery) for type declarations of the api, either look at the example, or copy this for the example, using typescript is recommended, but if you use typescript, you have to compile it yourself
```ts
(() => {
  class Extension implements PenguinExtension {
    Info() {
      return {
        name: "Example",
        color: "#0000FF",
        ID: "Example",
        blocks: [
            {
                opcode: "test", //should be unique, with no overlap with other opcodes
                color: 225, //optional color, can be a string, or number for a hex value
                blockType: Penguin.blockType.Statement(),
                args: [
                    Penguin.Argument.Dummy([
                        Penguin.Field.Text("test"),
                        Penguin.Field.TextInput("test", "test")
                    ])
                ]
            }
        ],
      };
    }
    generator = {
        test(block: Block) { //the function name is the same as the opcode
            return `//${block.getField("test")}`;
        }
    };
  }

  Penguin.LoadExtension(Extension);
})();
```
### Posting Extensions

You can post extensions to this [GitHub](https://github.com/PenguinBuilder/ExtensionGallery)

Create a folder for your extension and add these files

Submit a pull request to add it

#### Required Files
* index.js
* options.json

#### index.js
the file for your extension(it currently doesn't support multiple js files)

if the extension is of type loader then you have to have this file return a promise of a string, otherwise it is run as a normal file
___
#### image.png
an optional thumbnail image for the extension

___

#### options.json

Options for the file

##### Arguments
* creator: your GitHub name(I will set this for you when reviewing your pull request)
* potential-danger: a boolean on weather the extension is potentially dangerous, if your extension is a loader then it will have this automatically set to true (I will set this for you when reviewing your pull request)
* display-name: the name that the extension shows
* description: the description of the extension
* loader: an optional boolean showing weather the extension is a loader
* WIP: optional boolean, if set to true, your extension will be hidden in the extension menu, unless they add "?WIP" to the end of the URL
