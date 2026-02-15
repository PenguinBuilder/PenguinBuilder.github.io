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
- ID: the ID of the Input(make sure the id is unique to other inputs)
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
- ID: the ID of the input(make sure the id is unique to other inputs)
- Accept Reporters: a boolean on weather the input allows Reporters
- Menu: An Array that represents the menu(Accepts a string or a menu item) 
___
## Create Menu
like "Create Input Menu", this block will create a menu, but it can be used more than once  
![create menu](./images/create_menu.json) 
### Arguments
- ID: the ID of the menu(make sure the id is unique to other menus)
- Accept Reporters: a boolean on weather the input allows Reporters
- Menu: An Array that represents the menu(Accepts a string or a menu item) image of block
___
## Create Dynamic Menu
create a menu similar to "Create Menu" but its dynamic  
![create dynamic menu](./images/create_dynamic_menu.json)
### Arguments
- ID: the ID of the menu(make sure the id is unique to other menus)
- Accept Reporters: a boolean on weather the input allows Reporters
- Function: a statement for the menu(make sure it returns an array) image of block
___
# [#8D46AC] Category 
___
# [#D85450] JSON 
___
# [#FF667F] Functions 
___
# [#16BC8B] Controls 
___
# [#4D96FF] Logic 
___
# [#FF5827] Browser 
___
# [#FF00FF] Advanced 
___
# [#6C747C] Extensions 
___
