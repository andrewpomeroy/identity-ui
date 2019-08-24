import { colorMap } from "../theme/themeMapping";
import Color from 'color';
import styled from "@emotion/styled/macro";


const inputStyleProps = {
  fontSize: 18,
  paddingH: 16,
  paddingV: 12,
  backgroundColor: 'white',
  color: colorMap.inputText,
  // iconColor: colorMap.inputBorder,
  // iconSize: 18,
  borderWidth: 1,
  borderColor: colorMap.inputBorder,
  borderRadius: 3,
  placeholderColor: '#719dff',
  // placeholderColor: Color('#719dff').fade(.5).string(),
}
const inputFocusedStyleProps = {
  borderColor: colorMap.activeHighlight,
  boxShadow: `0px 0px 2px ${colorMap.activeHighlight}`,
  outline: 0
}

const inputLabelStyleProps = {
  fontSize: 16,
  fontWeight: 500,
  color: colorMap.labelText,
  marginBottom: 8
}

const Input = styled.input`
  width: 100%;
  font-size: ${inputStyleProps.fontSize}px;
  padding: ${inputStyleProps.paddingV}px ${inputStyleProps.paddingV}px;
  background-color: ${inputStyleProps.backgroundColor};
  border: ${inputStyleProps.borderWidth}px solid ${inputStyleProps.borderColor};
  border-radius: ${inputStyleProps.borderRadius}px;
  ::placeholder {
    color: ${inputStyleProps.placeholderColor};
  }
  &:focus {
    border-color: ${inputFocusedStyleProps.borderColor};
    box-shadow: ${inputFocusedStyleProps.boxShadow};
    outline: ${inputFocusedStyleProps.outline};
  }
`

export const InputLabel = styled.label`
  display: inline-block;
  font-size: ${inputLabelStyleProps.fontSize}px;
  font-weight: ${inputLabelStyleProps.fontWeight};
  color: ${inputLabelStyleProps.color};
  margin-bottom: ${inputLabelStyleProps.marginBottom}px;
`

export default Input;