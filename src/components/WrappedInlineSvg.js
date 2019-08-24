import React from 'react';
import InlineSVG from 'react-inlinesvg';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled/macro';

// eslint-disable-next-line
const intToPx = (str) => parseInt(str) == str ? str + 'px' : str;

const Container = styled.div`
  color: ${props => props.color || 'inherit'};
  height: ${props => props.autoSize ? 'auto' : intToPx(props.size) || intToPx(props.height) || '100%'};
  width: ${props => props.autoSize ? 'auto' : intToPx(props.size) || intToPx(props.width) || '100%'};
  svg {
    fill: ${props => props.fill || `currentColor`};
    ${props => props.stroke && `stroke: currentColor;`}
    ${props => props.stroke && `stroke-width: ${props.strokeWidth ? props.strokeWidth + 'px' : 'inherit'};`}
    width: 100%;
    height: 100%;
  }
`
const FilteredContainer = styled(Container, 
  { shouldForwardProp: prop => isPropValid(prop) && prop !== 'stroke' })({});

const WrappedInlineSvg = (props) => {
  const {src, ...rest} = props;
  return (
    <FilteredContainer {...rest}>
      <InlineSVG src={src}></InlineSVG>
    </FilteredContainer>
  )
}

export default WrappedInlineSvg;