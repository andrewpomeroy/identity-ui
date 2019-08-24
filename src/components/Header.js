import React from 'react';
import styled from '@emotion/styled/macro';
import { CenterColumnWrap, CenterColumn } from './commonLayout';
import { colors } from '../theme/theme';
import SplitWithChildMargin from './SplitWithChildMargin';
// import { HollowBlueButton } from './Buttons';
import AppBrand from './AppBrand';


export const headerTheme = {
  background: 'white',
  outerPaddingV: 32,
  outerPaddingVSmall: 24,
}

const HeaderOuter = styled.header`
  background-color: ${headerTheme.background};
  padding: ${headerTheme.outerPaddingV}px 0;
`

const OrgHeadingText = styled.span`
  color: ${colors.darkGreen};
`

function LandingHeader () {
  return (
    <HeaderOuter>
      <CenterColumnWrap>
        <CenterColumn>
          <SplitWithChildMargin style={{ justifyContent: 'space-between'}} gutter={20}>
            <div>
              <OrgHeadingText>Hawaii State Environmental Health Administration</OrgHeadingText>
              <AppBrand large />
            </div>
            <div>
              
              {/* <HollowBlueButton fontSize={0} buttonSpacing={1}>Admin Login</HollowBlueButton> */}
            </div>
          </SplitWithChildMargin>
        </CenterColumn>
      </CenterColumnWrap>
    </HeaderOuter>
  );
}

export default LandingHeader;
