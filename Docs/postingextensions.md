# Posting Extensions
you can post extensions to this [github](https://penguinbuilder.github.io/ExtensionGallery)

create a folder for your extension and add these files

submit a pull request to add it

* index.js
* options.json

## index.js
the file for your extension(it currently doesn't support multiple js files)

if the extension is of type loader then you have to have this file return a promise of a string, otherwise it is run as a normal file

___
## image.png
an optional thumbnail image for the extension

___

## options.json

options for the [file](https://penguinbuilder.github.io/Docs/#secret)

### Arguments

* creator: your github name(I will set this for you when reviewing your pull request)
* potential-danger: a boolean on weather the extension is potentially dangerous, if your extension is a loader then it will have this automatically set to true (I will set this for you when reviewing your pull request)
* display-name: the name that the extension shows
* description: the description of the extension
* loader: an optional boolean showing weather the extension is a loader
* WIP: if set to true, your extension will be hidden in the extension menu, unless they add "?WIP" to the end of the url
---

