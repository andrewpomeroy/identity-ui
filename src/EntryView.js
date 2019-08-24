import React, {useState, useContext} from 'react';
import landingBG from './clientAssets/landing-bg.jpg';
import styled from '@emotion/styled/macro';
import { HollowBlueButton, Button, PrimaryButton } from './components/Buttons';
import ModalBlock from './components/ModalBlock';
import AppBrand from './components/AppBrand';
import { Heading4 } from './theme/commonType';
import Input, { InputLabel } from './components/Input';
import { FlexContainer, FlexItem } from './components/commonLayout';
import arrowSvg from './icons/arrow.svg';
import WrappedInlineSvg from './components/WrappedInlineSvg';
import SplitWithChildMargin from './components/SplitWithChildMargin';
import { spacing } from './theme/theme';

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
  strong {
    font-weight: 700;
  }
`

const IconStyle = styled.div`
  /* position: absolute; */
  /* left: ${props => props.leftOffset}; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-left: ${props => props.leftOffset}px; */
  /* margin-right: ${props => props.leftOffset}px; */
  /* width: ${props => props.size}px; */
  /* height: ${props => props.height}px; */
`
// const ModalPagerContext = React.createContext();

// const ModalPagerContextProvider = ({children, ...props}) => {
//   const [currentPage, setPage] = useState(0);
//   return (
//     <ModalPagerContext.Provider value={{currentPage, setPage}}>
//       {(props) => children(props)}
//     </ModalPagerContext.Provider>
//   )
// }

// const ModalPager = ({render, ...props}) => {
//     <ModalPagerContextProvider>
//       <ModalPagerInner>

//       </ModalPagerInner>
//     </ModalPagerContextProvider>
// }

const ModalPagerDom = styled.div`
  position: relative;
  overflow: hidden;
`

const ModalPager = ({render, ...props}) => {
  const [currentPage, setPage] = useState(0);
  console.log(render);
  console.log(props);
  return (
      <ModalPagerDom>
        {render(currentPage, setPage)}
      </ModalPagerDom>
  )
}
// const ModalPagerInner = (props) => {
//   const {currentPage, setPage} = useContext(ModalPagerContext);
//   console.log(props.render);
//   return (
//     <ModalPagerContextProvider>
//       {props.render(currentPage, setPage)}
//     </ModalPagerContextProvider>
//   )
// }

const ModalPageDom = styled.div`
  position: ${props => props.offset !== 0 ? 'absolute' : 'static'};
  top: 0;
  left: 0;
  width: 100%;
  transform: translateX(${props => props.offset === -1 ? '-100%' : props.offset === 1 ? '100%' : '0'});
  transition: 300ms transform ease;
`

const ModalPage = (props) => {
  const offset = props.page < props.currentPage
    ? -1
    : props.page > props.currentPage
      ? 1
      : props.page === props.currentPage
        ? 0
        : null
  if (offset != null) {
    return (
      <ModalPageDom offset={offset}>{props.children}</ModalPageDom>
    ) 
  } 
  return null;
}



function EntryView() {
  return (
    <LandingBackground>
      <CenterContainer>
        <ModalBlock>
          <AppBrand large />
          <ModalBlockSpacer size="default" />
            {/* <HollowBlueButton>aaaaah</HollowBlueButton> */}
          <ModalPager render={(currentPage, setPage) => (
            <>
              <ModalPage page={0} currentPage={currentPage}>
                <ModalBlockTitle as="h2">Sign in to your account</ModalBlockTitle>
                <ModalBlockSpacer size="default" />
                <InputLabel>Username</InputLabel>
                <Input />
                <ModalBlockSpacer size="large" />
                <FlexContainer justifyContent="flex-end">
                  <FlexItem auto>
                    <PrimaryButton buttonSpacing={3} onClick={() => setPage(1)}>
                      <FlexContainer alignItems="center">
                        <SplitWithChildMargin gutter={spacing[0]}>
                          <FlexItem>Next</FlexItem>
                          <FlexItem auto>
                            <WrappedInlineSvg src={arrowSvg} stroke></WrappedInlineSvg>
                          </FlexItem>
                        </SplitWithChildMargin>
                      </FlexContainer>
                    </PrimaryButton>
                </FlexItem>
                </FlexContainer>
              </ModalPage>
              <ModalPage page={1} currentPage={currentPage}>
                <ModalBlockTitle as="h2">Signing in as <strong>andrewmichaelpomeroy@gmail.com</strong></ModalBlockTitle>
                <ModalBlockSpacer size="default" />
                <InputLabel>Password</InputLabel>
                <Input type="password" />
                <ModalBlockSpacer size="large" />
                <FlexContainer justifyContent="flex-end">
                  <FlexItem auto>
                    <PrimaryButton buttonSpacing={3} onClick={() => setPage(0)}>
                      <FlexContainer alignItems="center">
                        <SplitWithChildMargin gutter={spacing[0]}>
                          <FlexItem>Sign In</FlexItem>
                        </SplitWithChildMargin>
                      </FlexContainer>
                    </PrimaryButton>
                </FlexItem>
                </FlexContainer>
              </ModalPage>
            </>
          )}></ModalPager>
        </ModalBlock>
      </CenterContainer>
    </LandingBackground>
  );
}

export default EntryView;
