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
const inputErrorStyleProps = {
  borderColor: colorMap.error,
  backgroundColor: Color(colorMap.error).fade(.9).string(),
  boxShadow: `0px 0px 2px ${colorMap.error}`,
  // outline: 0
}

const inputLabelStyleProps = {
  fontSize: 16,
  fontWeight: 400,
  color: colorMap.labelText,
  marginBottom: 8
}

const Input = styled.input`
  width: 100%;
  font-size: ${inputStyleProps.fontSize}px;
  padding: ${inputStyleProps.paddingV}px ${inputStyleProps.paddingV}px;
  background-color: ${props => props.isError ? inputErrorStyleProps.backgroundColor : inputFocusedStyleProps.backgroundColor};
  border: ${inputStyleProps.borderWidth}px solid;
  border-color: ${inputStyleProps.borderColor};
  border-radius: ${inputStyleProps.borderRadius}px;
  ::placeholder {
    color: ${inputStyleProps.placeholderColor};
  }
  &:focus {
    border-color: ${inputFocusedStyleProps.borderColor};
    outline: ${inputFocusedStyleProps.outline};
    box-shadow: ${props => props.isError ? inputErrorStyleProps.boxShadow : inputFocusedStyleProps.boxShadow};
  }
  &, &:focus {
    ${props => props.isError && `border-color: ${inputErrorStyleProps.borderColor};`}
  }
`

export const InputLabel = styled.label`
  display: inline-block;
  font-size: ${inputLabelStyleProps.fontSize}px;
  font-weight: ${inputLabelStyleProps.fontWeight};
  color: ${props => props.isError ? colorMap.error : inputLabelStyleProps.color};
  margin-bottom: ${inputLabelStyleProps.marginBottom}px;
`

export default Input;