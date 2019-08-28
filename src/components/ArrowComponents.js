import React from 'react';
import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import WrappedInlineSvg from './WrappedInlineSvg';
import chevronSvg from '../icons/chevron.svg';
import arrowSvg from '../icons/arrow.svg';

const getTransform = direction => {
  switch (direction) {
    case 'up':
      return 'rotate(-90deg)';
    case 'down':
      return 'rotate(90deg)';
    case 'left':
      return 'rotate(180deg)';
    case 'right':
    default:
      return 'none'
  }
}

const SvgTransformWrap = styled(WrappedInlineSvg)`
  transform: ${props => getTransform(props.direction)};
`

const ArrowComponentInner = ({ src, stroke, ...rest }) => {
  return <SvgTransformWrap src={src} stroke={stroke != null ? stroke : true} fill="none" {...rest}></SvgTransformWrap>
}
ArrowComponentInner.propTypes = {
  stroke: PropTypes.oneOf([
    PropTypes.bool,
    PropTypes.string
  ])
}

export const Chevron = ({direction, ...props}) => <ArrowComponentInner src={chevronSvg} direction={direction} {...props}></ArrowComponentInner>
export const Arrow = ({direction, ...props}) => <ArrowComponentInner src={arrowSvg} direction={direction} {...props}></ArrowComponentInner>