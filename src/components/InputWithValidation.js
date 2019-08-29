import React, { useState, useEffect, useRef } from 'react';
import { colorMap } from "../theme/themeMapping";
import styled from "@emotion/styled/macro";
import Input from "./Input";
import { colors } from '../theme/theme';

const InputContainer = styled.div``

const ValidationMessage = styled.div`
  font-size: 10px;
  color: ${colors.red};
`
const ValidationMessages = styled.div``

const InputWithValidation = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(undefined);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (isValid === false) setMessages(['You suck']);
    else setMessages([]);
  }, [inputValue, isValid]);

  const onChange = (event) => {
    const value = event.target.value;
    console.log('onchange says', value);
    if (value === 'lol') setIsValid(false);
    else setIsValid(true);
    setInputValue(value);
  }

  const Control = React.cloneElement(props.control, { onChange, value: inputValue, isInvalid: isValid === false })

  return (
    <InputContainer>
      {Control}
      <ValidationMessages isValid={isValid}>
        {!!messages.length && messages.map((message, index) => (
          <ValidationMessage key={index}>{message}</ValidationMessage>
        ))}
      </ValidationMessages>
    </InputContainer>
  )
}

export default InputWithValidation;