import React from 'react';
import styled from '@emotion/styled/macro';
import WrappedInlineSvg from './WrappedInlineSvg';
import LoadingSpinner from './LoadingSpinner';
import posed, { PoseGroup } from 'react-pose';

const Content = posed.div({
  hidden: {
    opacity: 0,
    scale: .75,
    originX: '50%',
    originY: '50%',
    transition: {
      default: {
        duration: 100,
      }
    }
  },
  shown: {
    opacity: 1,
    scale: 1,
    transition: {
      default: {
        duration: 200,
        delay: 200,
      }
    }
  }
});

const SpinnerStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  /* background-color: ${props => props.isLoading ? 'red' : 'transparent'}; */
  pointer-events: none;
`
const Spinner = posed(SpinnerStyle)({
  hidden: {
    scale: 0,
    originX: '50%',
    originY: '50%',
    opacity: 0,
    transition: {
      scale: {
        ease: 'easeInOut',
        duration: 300,
        delay: 0
      },
      opacity: {
        ease: 'linear',
        duration: 300,
        delay: 0
      }
    },
  },
  shown: {
    scale: 1,
    originX: '50%',
    originY: '50%',
    opacity: 1,
    transition: {
      scale: {
        ease: 'easeInOut',
        duration: 200,
        delay: 150
      },
      opacity: {
        ease: 'linear',
        duration: 200,
        delay: 150
      }
    },
  }
})

const ButtonLoaderShell = ({isLoading, children}) => (
  <PoseGroup>
    <Content key="content" pose={isLoading ? 'hidden' : 'shown'}>{children}</Content>
    <Spinner key="spinner" pose={isLoading ? 'shown' : 'hidden'} isLoading={isLoading}>
      <LoadingSpinner></LoadingSpinner>
    </Spinner>
  </PoseGroup>
)

export default ButtonLoaderShell;