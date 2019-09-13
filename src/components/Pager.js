import React, { useReducer } from 'react';
import posed, { PoseGroup } from "react-pose";
import styled from '@emotion/styled/macro';

const PagerWrapper = styled.div`
  position: relative;
  overflow: hidden;
`
const pagerInitialState = {
  transitionDirection: 0,
  currentPage: 0
}

const pagerReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return {
        transitionDirection: 1,
        currentPage: state.currentPage + 1
      };
    case 'decrement':
      return {
        transitionDirection: -1,
        currentPage: state.currentPage - 1
      };
    case 'set':
      return {
        transitionDirection: action.direction !== undefined 
          ? action.direction
          : (action.value < state.currentPage
            ? -1
            : action.value > state.currentPage
              ? 1
              : 0),
        currentPage: action.value
      }
    default: 
      throw new Error(action)
  }
}

const Pager = ({children, ...props}) => {
  const [pager, pagerDispatch] = useReducer(pagerReducer, pagerInitialState);

  // PoseGroup will only animate direct children, and because children of a render prop have to be wrapped in a Fragment, we have to discard that here. Otherwise, there would only be one direct child (the wrapping Fragment), and the inner children would never animate.
  const innerChildren = children(pager, pagerDispatch).type === React.Fragment ? children(pager, pagerDispatch).props.children : children(pager, pagerDispatch);

  return (
      <PagerWrapper>
        <PoseGroup
          preEnterPose="enter"
          enterPose="default"
          exitPose="exit">
          {innerChildren.map(child => child.props.page === pager.currentPage ? child : null)}
        </PoseGroup>
      </PagerWrapper>
  )
}

export default Pager;

const transition = {
  x: {
    duration: 400,
    ease: 'easeOut'
  }
};

export const Page = posed.div({
  enter: { 
    x: ({ transitionDirection }) => {
      return transitionDirection > 0 ? "100%" : "-100%"
    },
    transition
  },
  exit: { 
    x: ({ transitionDirection }) => {
      return transitionDirection > 0 ? "100%" : "-100%"
    },
    transition
  },
  default: { 
    x: 0,
    transition    
  },
});