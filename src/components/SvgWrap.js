import React from 'react';
import styled from '@emotion/styled/macro';

const SvgWrap = styled.div`
  color: ${props => props.color || 'inherit'};
  height: ${props => props.autoSize ? 'auto' : props.size || props.height || '100%'};
  width: ${props => props.autoSize ? 'auto' : props.size || props.width || '100%'};
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  svg {
    fill: ${props => props.fill || `currentColor`};
    ${props => props.stroke && `stroke: currentColor;`}
    ${props => props.stroke && `stroke-width: inherit;`}
    width: 100%;
    height: 100%;
  }
`

export default SvgWrap;