import "./blocks/math.ts";
import "./blocks/text.ts";
import "./blocks/colour.ts";
import "./blocks/controls.ts";

import {Hats, HatsDark} from "./themes.ts"
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import * as En from 'blockly/msg/en';
import {
  ContinuousToolbox,
  ContinuousFlyout,
  ContinuousMetrics,
  registerContinuousToolbox,
} from '@blockly/continuous-toolbox';
import toolbox from './toolbox.json';
import '@blockly/toolbox-search';
import {WorkspaceSearch} from '@blockly/plugin-workspace-search';

import themeSelector from "../theme-selector.ts";

Blockly.setLocale(En as any);

registerContinuousToolbox();

const workspace = Blockly.inject("block-editor", {
    plugins: {
        toolbox: ContinuousToolbox,
        flyoutsVerticalToolbox: ContinuousFlyout,
        metricsManager: ContinuousMetrics,
    },
    renderer: "zelos",
    toolbox,
    theme: Hats,
} as Blockly.BlocklyOptions);


themeSelector(() => workspace.setTheme(Hats), () => workspace.setTheme(HatsDark));

workspace.setScale(0.7);
workspace.addChangeListener(Blockly.Events.disableOrphans);
const workspaceSearch = new WorkspaceSearch(workspace);
workspaceSearch.init();

