import * as Blockly from "blockly/core";
import Dark from "@blockly/theme-dark";

export const Hats = Blockly.Theme.defineTheme('hats', {
    name: "hats",
    base: Blockly.Themes.Classic,
    startHats: true,
});


export const HatsDark = Blockly.Theme.defineTheme('hats', {
    name: "hats",
    base: Dark,
    startHats: true,
});

