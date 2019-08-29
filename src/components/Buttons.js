import React from 'react';
import styled from '@emotion/styled/macro';
import { colorMap } from '../theme/themeMapping';
import { borders, color, fontSize, fontWeight } from 'styled-system';
import { buttonSpacing } from '../styleFunctions/ButtonStyleFunctions';

const buttonStyles = {
  borderRadius: 3
}

export const Button = styled.button`
  color: inherit;
  border: 0;
  border-radius: ${buttonStyles.borderRadius}px;
  padding: .9em 1.5em;
  ${borders}
  ${color}
  ${fontSize}
  ${fontWeight}
  ${buttonSpacing}
  cursor: pointer;
  &:focus {
    outline: 0;
  } 
`;

const GhostButtonStyles = `
  background-color: transparent;
  &:hover, &:focus {
    background-color: ${colorMap.transparentHighlight};
  }
`;

export const GhostButton = styled(Button)`
  ${GhostButtonStyles}
`;

const IconButtonStyle = styled(Button)`
  padding: ${props => props.padding}px;
  width: ${props => props.size};
  height: ${props => props.size};
`

export const IconButton = ({icon, ...props}) => {
  return (<IconButtonStyle {...props}>{React.cloneElement(icon, { size: '100%' })}</IconButtonStyle>);
}
IconButton.defaultProps = {
  padding: 4,
  size: '1.5em'
}

export const GhostIconButton = styled(IconButton)`
  ${GhostButtonStyles}
`

export const PrimaryButton = (props, styleProps) => (
  <Button
    backgroundColor="primary"
    color="white"
    fontWeight="500"
    {...props}
    {...styleProps}>
    {props.children}</Button>
)

export const HollowBlueButton = (props, styleProps) => (
  <Button
    border="2px solid"
    borderColor="electricBlue"
    borderRadius="5"
    color="electricBlue"
    fontWeight="600"
    {...props}
    {...styleProps}>
    {props.children}
  </Button>
)