import React from 'react';
import styled from '@emotion/styled/macro';
import { Heading1 } from '../theme/commonType';
import { colorMap } from '../theme/themeMapping';

const AppBrandHeading = styled(Heading1)`
  font-size: ${props => props.large ? 30 : 18}px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .018em;
  color: ${colorMap.highlightText};
  strong {
    color: ${colorMap.boldText};
    font-weight: 700;
  }
`

const AppBrand = (props) => {
  return (<>
    <AppBrandHeading {...props}>
      EHA<strong>Connect</strong>
    </AppBrandHeading>
  </>)
}

export default AppBrand;