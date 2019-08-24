import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '../theme/theme';
import { colorMap } from '../theme/themeMapping';
import { borders, space, color, fontSize, fontWeight } from 'styled-system';
import { buttonSpacing } from '../styleFunctions/ButtonStyleFunctions';

const buttonStyles = {
  borderRadius: 3
}

export const Button = styled.button`
  border: 0;
  border-radius: ${buttonStyles.borderRadius}px;
  ${borders}
  ${color}
  ${fontSize}
  ${fontWeight}
  ${buttonSpacing}
  cursor: pointer;
  &:focus {
    outline: 0;
  }
  
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