import React from 'react';
import landingBG from './clientAssets/landing-bg.jpg';
import styled from '@emotion/styled/macro';
import { HollowBlueButton, Button, PrimaryButton } from './components/Buttons';
import ModalBlock from './components/ModalBlock';
import AppBrand from './components/AppBrand';
import { Heading4 } from './theme/commonType';
import Input, { InputLabel } from './components/Input';
import { FlexContainer, FlexItem } from './components/commonLayout';

const LandingBackground = styled.div`
  flex: 1;
  width: 100%;
  background-image: url(${landingBG});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  position: relative;
  display: flex;
  flex-direction: column;
`

const CenterContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalBlockBox = styled.div`
  
`
const modalBlockSpacerHeights = {
  small: 26,
  default: 36,
  large: 48
}
const ModalBlockSpacer = styled.div`
  height: ${props => modalBlockSpacerHeights[props.size || 'default']}px;
`
const ModalBlockTitle = styled(Heading4)`
  font-weight: 600;
`

function EntryView() {
  return (
    <LandingBackground>
      <CenterContainer>
        <ModalBlock>
          <AppBrand large />
          <ModalBlockSpacer size="default" />
            {/* <HollowBlueButton>aaaaah</HollowBlueButton> */}
          <ModalBlockTitle as="h2">Sign in to your account</ModalBlockTitle>
          <ModalBlockSpacer size="default" />
          <InputLabel>Username</InputLabel>
          <Input />
          <ModalBlockSpacer size="large" />
          <FlexContainer justifyContent="flex-end">
            <FlexItem auto>
              <PrimaryButton buttonSpacing={2}>Sign In</PrimaryButton>
            </FlexItem>
          </FlexContainer>
        </ModalBlock>
      </CenterContainer>
    </LandingBackground>
  );
}

export default EntryView;
