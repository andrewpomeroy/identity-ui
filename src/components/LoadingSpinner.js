import React from 'react';
import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/core';


const SpinnerOuter = styled.div`
  position: ${props => props.inline ? 'static' : 'absolute'};
  ${props => !props.inline && `
    width: 100%;
    height: 100%;
  `}
  color: ${props => props.color || 'inherit'};
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`

const SpinnerInner = styled.div`
  position: ${props => props.inline ? 'static' : 'absolute'};
  ${props => (!props.inline &&
  `top: calc(50% - ${props.size / 2}px);
  left: calc(50% - ${props.size / 2}px);`) || ''}
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  border: ${props => props.borderWidth}px solid currentColor;
  border-top-color: transparent;
  border-right-color: transparent;
  animation: ${rotate} ${props => props.cycleDuration}ms 0s infinite linear;
  animation-fill-mode: both;
  transform-origin: 50% 50%;
  border-radius: 50%;
`

const LoadingSpinner = (props) => (
  <SpinnerOuter inline={props.inline}>
    <SpinnerInner 
      inline={props.inline} 
      size={props.size} 
      borderWidth={props.borderWidth} 
      cycleDuration={props.cycleDuration} />
  </SpinnerOuter>
)
LoadingSpinner.defaultProps = {
  size: 20,
  borderWidth: 2,
  cycleDuration: 800,
  inline: false
}

export default LoadingSpinner;