import {
  style,
  compose,
  getPx,
  mapProps
} from "styled-system";

export const buttonSpacingLeft = style({
  prop: "paddingLeft",
  key: "buttonSpacingH",
  alias: "buttonSpacingLeft",
  transformValue: getPx,
});

export const buttonSpacingRight = style({
  prop: "paddingRight",
  key: "buttonSpacingH",
  alias: "buttonSpacingRight",
  transformValue: getPx
});

export const buttonSpacingTop = style({
  prop: "paddingTop",
  key: "buttonSpacingV",
  alias: "buttonSpacingTop",
  transformValue: getPx,
});

export const buttonSpacingBottom = style({
  prop: "paddingBottom",
  key: "buttonSpacingV",
  alias: "buttonSpacingBottom",
  transformValue: getPx
});

export const buttonSpacingH = mapProps(props => ({
  ...props,
  buttonSpacingLeft: props.buttonSpacingH || props.buttonSpacing,
  buttonSpacingRight: props.buttonSpacingH || props.buttonSpacing
}))(
  compose(
    buttonSpacingLeft,
    buttonSpacingRight
  )
)

export const buttonSpacingV = mapProps(props => ({
  ...props,
  buttonSpacingTop: props.buttonSpacingV || props.buttonSpacing,
  buttonSpacingBottom: props.buttonSpacingV || props.buttonSpacing,
}))(
  compose(
    buttonSpacingTop,
    buttonSpacingBottom
  )
)

export const buttonSpacing = compose(
  buttonSpacingH,
  buttonSpacingV
)