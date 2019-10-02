import React, { useRef, useEffect } from "react";
import Color from 'color';
import styled from "@emotion/styled/macro";
import { colors } from "../theme/theme";

const inputStyleProps = {
  fontSize: 18,
  paddingH: 16,
  paddingV: 12,
  backgroundColor: 'white',
  color: colors.inputText,
  // iconColor: colors.inputBorder,
  // iconSize: 18,
  borderWidth: 1,
  borderColor: colors.inputBorder,
  borderRadius: 3,
  placeholderColor: '#719dff',
  // placeholderColor: Color('#719dff').fade(.5).string(),
}
const inputFocusedStyleProps = {
  borderColor: colors.activeHighlight,
  boxShadow: `0px 0px 2px ${colors.activeHighlight}`,
  outline: 0
}
const inputErrorStyleProps = {
  borderColor: colors.error,
  backgroundColor: Color(colors.error).fade(.9).string(),
  boxShadow: `0px 0px 2px ${colors.error}`,
  // outline: 0
}

const inputLabelStyleProps = {
  fontSize: 16,
  fontWeight: 400,
  color: colors.labelText,
  marginBottom: 8
}

const StyledInput = styled.input`
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

// const Input = forwardRef(({willAutoFocus, ...props}, ref) => {
const Input = ({willAutoFocus, ...props}) => {
  const someRef = useRef();
  useEffect(() => {
    if (willAutoFocus) {
      if (someRef.current && document.activeElement !== someRef.current) {
        someRef.current.focus();
      }
    }
  }, [willAutoFocus])

  return <StyledInput ref={someRef} { ...props} />
};


export const InputLabel = styled.label`
  display: inline-block;
  font-size: ${inputLabelStyleProps.fontSize}px;
  font-weight: ${inputLabelStyleProps.fontWeight};
  color: ${props => props.isError ? colors.error : inputLabelStyleProps.color};
  margin-bottom: ${inputLabelStyleProps.marginBottom}px;
`

export default Input;