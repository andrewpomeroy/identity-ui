import React from 'react';
import styled from '@emotion/styled/macro';
import Color from 'color';
import { borders, color, fontSize, fontWeight } from 'styled-system';
import { buttonSpacing } from '../styleFunctions/ButtonStyleFunctions';
import { colors } from '../theme/theme';

const buttonStyles = {
  borderRadius: 3,
  transitionDuration: 50,
}

const StyledButton = styled.button`
  position: relative;
  color: inherit;
  border: 0;
  border-radius: ${buttonStyles.borderRadius}px;
  padding: .9em 1.5em;
  ${borders}
  ${color}
  ${fontSize}
  ${fontWeight}
  ${buttonSpacing}
  transition: background-color ${buttonStyles.transitionDuration}ms linear, transform ${buttonStyles.transitionDuration * 2}ms ease;
  &:active {
    transform: scale(.98);
  }
  &:focus {
    outline: 0;
  }
  &[disabled] {
    opacity: .4;
  }
  &:not([disabled]) {
    cursor: pointer;
  }
`
const Button = ({isDisabled, children, ...props}) => {
  return (
    <StyledButton
      type="button"
      disabled={isDisabled}
      {...props}>
      {children}
    </StyledButton>)
}

const GhostButtonStyles = `
  background-color: transparent;
  &:hover, &:focus {
    background-color: ${colors.transparentHighlight};
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

// export const PrimaryButton = (props, styleProps) => (
//   <Button
//     backgroundColor="primary"
//     color="white"
//     fontWeight="500"
//     {...props}
//     {...styleProps}>
//     {props.children}</Button>
// )
export const PrimaryButton = styled(Button)`
  background-color: ${colors.primary};
  color: ${colors.white};
  font-weight: 500;
  &:not([disabled]) {
    &:hover, &:focus {
      background-color: ${Color(colors.primary).lighten(.05).string()};
    }
    &:active {
      background-color: ${Color(colors.primary).darken(.1).string()};
    }
  }
`

// export const HollowBlueButton = (props, styleProps) => (
//   <Button
//     border="2px solid"
//     borderColor="electricBlue"
//     borderRadius="5"
//     color="electricBlue"
//     fontWeight="600"
//     {...props}
//     {...styleProps}>
//     {props.children}
//   </Button>
// )
export const HollowBlueButton = styled(Button)`
  border: 2px solid ${colors.electricBlue};
  border-radius: 5px;
  color: ${colors.electricBlue};
  font-weight: 600;
`