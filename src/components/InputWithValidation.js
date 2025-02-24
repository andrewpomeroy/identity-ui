import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled/macro";
import {InputLabel} from "./Input";
import PropTypes from 'prop-types';
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
  const [isError, setisError] = useState(false);
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState([]);

  useEffect(() => setId(uuid()), [])

  const makeMessagesArray = (messages) => typeof(messages) === 'string' ? [messages] : messages;

  useEffect(() => {
    setisError(props.touched[props.name]  && props.errors[props.name]);
    setMessages((props.touched[props.name] && props.errors[props.name] && makeMessagesArray(props.errors[props.name])) || []);
  }, [props.name, props.errors, props.touched]);

  const handleKeyDown = (event) => {
    if (event.keyCode && event.keyCode === 13) {
      if (!props.allowEnterKey) event.preventDefault();
      if (props.onEnterKey) props.onEnterKey(event);
    }
    if (props.onKeyDown) props.onKeyDown(event);
  }

  const controlLabelProps = {
    isError: isError,
    id: `${id}-label`,
    htmlFor: `${id}-control`
  }

  const ControlLabel = props.labelComponent ?
    React.cloneElement(props.labelComponent, {...controlLabelProps})
    : props.label 
      ? (<InputLabel {...controlLabelProps}>{props.label}</InputLabel>) 
      : null
 
  const getStandardControlProps = (controlProps) => ({
    id: `${id}-control`,
    onChange: props.onChange,
    onBlur: props.onBlur,
    name: props.name,
    value: props.values[props.name] || '',
    // value: inputValue,
    isError,
    onKeyDown: handleKeyDown,
    allowEnterKey: controlProps.allowEnterKey,
    type: controlProps.type || 'text',
    "aria-describedby": `${controlProps.ariaDescribedBy || ''} ${id}-messages`,
    "aria-invalid": !!isError
  });

  const Control = React.cloneElement(props.control, {...getStandardControlProps(props.control.props)})

  return (
    <InputContainer>
      {ControlLabel}
      {Control}
      <ValidationMessages 
        id={`${id}-messages`}
        isError={!!isError}
        aria-live="assertive"
        aria-relevant="additions removals">
        {(!messages || !messages.length) && 
          <ValidationMessagePlaceholder />
        }
        {messages && !!messages.length && messages.map((message, index) => (
          <ValidationMessage key={index}>{message}</ValidationMessage>
        ))}
      </ValidationMessages>
    </InputContainer>
  )
}

// TODO: round out prop types
InputWithValidation.propTypes = {
  name: PropTypes.string.isRequired,
  onKeyDown: PropTypes.func,
  onEnterKey: PropTypes.func,
  allowEnterKey: PropTypes.bool
}

export default InputWithValidation;