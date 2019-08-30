import React, { useState, useEffect, useRef } from 'react';
import { colorMap } from "../theme/themeMapping";
import styled from "@emotion/styled/macro";
import Input, {InputLabel} from "./Input";
import { colors } from '../theme/theme';
import uuid from 'uuid4';

const validationMessagesPaddingOuter = 4;
const validationMessagesPaddingInner = 4;
const validationMessagesFontSize = 10;

const bottomSpacerSize = 20;
const bottomPaddingCalculated = bottomSpacerSize - validationMessagesFontSize - validationMessagesPaddingOuter * 2;

const InputContainer = styled.div`
  padding-bottom: ${bottomPaddingCalculated}px;
`

const ValidationMessage = styled.div`
  font-size: 10px;
  line-height: 1;
  color: ${colors.red};
  &:not(:last-child) {
    padding-bottom: ${validationMessagesPaddingInner}px;
  }
`
const ValidationMessagePlaceholder = () => <ValidationMessage>&nbsp;</ValidationMessage>

const ValidationMessages = styled.div`
  padding: ${validationMessagesPaddingOuter}px 0;
`

const InputWithValidation = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState([]);

  useEffect(() => setId(uuid()), [])

  useEffect(() => {
    if (isValid === false) setMessages(['You suck']);
    else setMessages([]);
  }, [inputValue, isValid]);

  const onChange = (event) => {
    const value = event.target.value;
    if (value === 'lol') setIsValid(false);
    else setIsValid(true);
    setInputValue(value);
  }

  const controlLabelProps = {
    isInvalid: isValid === false,
    htmlFor: id
  }

  const ControlLabel = props.labelComponent ?
    React.cloneElement(props.labelComponent, {...controlLabelProps})
    : props.label 
      ? (<InputLabel {...controlLabelProps}>{props.label}</InputLabel>) 
      : null
 
  const controlProps = {
    id,
    onChange, 
    value: inputValue,
    isInvalid: isValid === false
  };

  const Control = React.cloneElement(props.control, {...controlProps})
  


  return (
    <InputContainer>
      {ControlLabel}
      {Control}
      <ValidationMessages isValid={isValid}>
        {!messages.length && 
          <ValidationMessagePlaceholder />
        }
        {!!messages.length && messages.map((message, index) => (
          <ValidationMessage key={index}>{message}</ValidationMessage>
        ))}
      </ValidationMessages>
    </InputContainer>
  )
}

export default InputWithValidation;