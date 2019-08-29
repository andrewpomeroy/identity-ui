import React from 'react';

import styled from '@emotion/styled/macro';
import { flexbox } from '../styleFunctions/StyleFunctions';

const SplitWithChildMarginWrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
  align-items: inherit;
  align-content: inherit;
  justify-content: inherit;
  ${flexbox}
`

const SplitWithChildMargin = (props) => {
  let margin = props.gutter / 2;
  margin = typeof(props.gutter) === 'string' ? margin : (margin + 'px');
  const { children, usePadding, ...rest } = props;

  return (
    <SplitWithChildMarginWrapper {...rest}>
      {children && children.length 
      ? children.map((child, index) => {
        const isFirst = index === 0;
        const isLast = index === children.length - 1;
        return React.cloneElement(child, {
          key: index,
          ...child.props,
          style: {
            ...child.props.style,
            marginLeft: usePadding || isFirst ? undefined : margin,
            marginRight: usePadding || isLast ? undefined : margin,
            paddingLeft: !usePadding || isFirst ? undefined : margin,
            paddingRight: !usePadding || isLast ? undefined : margin
          },
        })
      })
      : children
    }
    </SplitWithChildMarginWrapper>

  )
}

SplitWithChildMargin.defaultProps = {
  usePadding: false,
  gutter: 12
}

export default SplitWithChildMargin