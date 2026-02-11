import * as Blockly from "blockly/core";

export const Hats = Blockly.Theme.defineTheme('hats', {
    name: "hats",
    base: Blockly.Themes.Zelos,
    startHats: true,
    categoryStyles: {
        json_category: {
            colour: '#d9534f',
        },
        extension_category: {
            colour: '#6c757d', 
        },
        advanced_category: {
            colour: '#ff00ff',
        },
        browser_category: {
            colour: "#ff5722",
        },
        scratch_category: {
            colour: "#6C9BCF",
        },
        category_category: {
            colour: "#8e44ad",
        },
    },
    blockStyles: {
        json_blocks: {
            colourPrimary: '#d9534f',
        },
        advanced_blocks: {
            colourPrimary: '#ff00ff',
        },
        browser_blocks: {
            colourPrimary: "#ff5722",
        },
        scratch_blocks: {
            colourPrimary: "#6C9BCF",
        },
        category_blocks: {
            colourPrimary: "#8e44ad",
        },
    },
});

export const HatsDark = Blockly.Theme.defineTheme('hats-dark', {
    name: "hats-dark",
    base: Hats,
    componentStyles: {
        workspaceBackgroundColour: '#1e1e1e',
        toolboxBackgroundColour: '#333',
        toolboxForegroundColour: '#fff',
        flyoutBackgroundColour: '#252526',
        flyoutForegroundColour: '#ccc',
        flyoutOpacity: 1,
        scrollbarColour: '#797979',
        insertionMarkerColour: '#fff',
        insertionMarkerOpacity: 0.3,
        scrollbarOpacity: 0.4,
        cursorColour: '#d0d0d0',
    },
    startHats: true,
});

