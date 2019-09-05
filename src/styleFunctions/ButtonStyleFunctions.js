import {
  get,
  system,
  compose,
  // getPx,
  // mapProps
} from "styled-system";

const config = {
  buttonSpacingLeft: {
    property: "paddingLeft",
    // key: "buttonSpacingH",
    // alias: "buttonSpacingLeft",
    scale: 'buttonSpacing'
    // transformValue: getPx,
  },
  buttonSpacingRight: {
    property: "paddingRight",
    // key: "buttonSpacingH",
    // alias: "buttonSpacingRight",
    scale: 'buttonSpacing'
    // transformValue: getPx
  },

  buttonSpacingTop: {
    property: "paddingTop",
    // key: "buttonSpacingV",
    // alias: "buttonSpacingTop",
    scale: 'buttonSpacing'
    // transformValue: getPx,
  },

  buttonSpacingBottom: {
    property: "paddingBottom",
    // key: "buttonSpacingV",
    // alias: "buttonSpacingBottom",
    scale: 'buttonSpacing'
    // transformValue: getPx
  },
  buttonSpacingH: {
    properties: ["paddingLeft, paddingRight"],
    scale: "buttonSpacing"
  },
  buttonSpacingV: {
    properties: ["paddingTop, paddingBottom"],
    scale: "buttonSpacing"
  }
}

export const buttonSpacing = system(config)