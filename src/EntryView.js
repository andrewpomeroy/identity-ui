import React, {useState } from 'react';
import { Formik } from 'formik';
import landingBG from './clientAssets/landing-bg.jpg';
import styled from '@emotion/styled/macro';
import { PrimaryButton, GhostButton, GhostIconButton, IconButton } from './components/Buttons';
import ModalBlock from './components/ModalBlock';
import AppBrand, { AppBrandWithSubhead } from './components/AppBrand';
import { Heading4, UnstyledH2, UnstyledHeading, getComputedLineHeight } from './theme/commonType';
import Input, { InputLabel } from './components/Input';
import { FlexContainer, FlexItem } from './components/commonLayout';
import arrowSvg from './icons/arrow.svg';
import WrappedInlineSvg from './components/WrappedInlineSvg';
import SplitWithChildMargin from './components/SplitWithChildMargin';
import { spacing } from './theme/theme';
import { typeScaleMap } from './theme/themeMapping';
import { Arrow, Chevron } from './components/ArrowComponents';
import InputWithValidation from './components/InputWithValidation';
import * as Yup from 'yup';
import uuid from 'uuid4';


const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email address")
    .required('Required'),
  password: Yup.string()
    .required('Required')
});
const initialValues = {
  email: '',
  password: '',
};

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

const ModalBlockBox = styled.div``

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
const ModalBlockTitleSmall = styled(ModalBlockTitle)`
  font-size: ${typeScaleMap.h5}px;
  /* line-height: ${getComputedLineHeight('h4')}px; */
  text-overflow: ellipsis;
  overflow: hidden;
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

const ModalPager = ({children, ...props}) => {
  const [currentPage, setPage] = useState(0);
  return (
      <ModalPagerDom>
        {children(currentPage, setPage)}
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
  const [nextButtonEnabled, setNextButtonEnabled] = useState();

  return (
    <LandingBackground>
      <CenterContainer>
        <ModalBlock>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            validateOnChange={true}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 500);
            }}
            render={({ handleSubmit, handleChange, handleBlur, setValues, setTouched, values, errors, touched }) => (
            <React.Fragment>
              <form onSubmit={handleSubmit}>
                <AppBrandWithSubhead large />
                <ModalBlockSpacer size="small" />
                <ModalPager>
                {(currentPage, setPage) => 
                  <>
                    <ModalPage page={0} currentPage={currentPage}>
                      <ModalBlockTitle as="div">&nbsp;</ModalBlockTitle>
                      <ModalBlockTitle as="h2">Sign in to your account</ModalBlockTitle>
                      <ModalBlockSpacer size="small" />
                      <InputWithValidation 
                        label="Email Address" 
                        name="email" 
                        onEnterKey={() => {
                            values.email && !errors.email && setPage(1);
                            setTouched({...touched, email: true});
                        }}
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        values={values} 
                        errors={errors}
                        touched={touched}
                        control={
                          <Input autoComplete={uuid()} />
                        } />
                      <ModalBlockSpacer size="default" />
                      <FlexContainer justifyContent="flex-end">
                        <FlexItem auto>
                          {/* TODO: Replace this with an icon-button pattern */}
                          <PrimaryButton buttonSpacing={3} onClick={() => { 
                            values.email && !errors.email && setPage(1);
                            setTouched({...touched, email: true});
                          }}>
                            <FlexContainer alignItems="center">
                              <SplitWithChildMargin gutter={8}>
                                <FlexItem>Next</FlexItem>
                                <FlexItem auto style={{marginTop: -5, marginBottom: -5}}>
                                  <Arrow></Arrow>
                                </FlexItem>
                              </SplitWithChildMargin>
                            </FlexContainer>
                          </PrimaryButton>
                      </FlexItem>
                      </FlexContainer>
                    </ModalPage>
                    <ModalPage page={1} currentPage={currentPage}>
                      <FlexContainer flexDirection="column" justifyContent="flex-end" style={{height: getComputedLineHeight('h4') * 2}}>
                        <FlexItem auto>
                          <SplitWithChildMargin gutter={8}>
                            <FlexItem auto>
                              <GhostIconButton
                                onClick={() => {
                                  setValues({...values, password: ''});
                                  setTouched({...touched, password: false});
                                  setPage(0)
                                }}
                                size={`${getComputedLineHeight('h5')}px`}
                                icon={<Arrow direction="left"></Arrow>} />
                            </FlexItem>
                            <FlexItem>
                              <UnstyledHeading as="h2">
                                <ModalBlockTitleSmall as="div">Signing in as</ModalBlockTitleSmall>
                                <ModalBlockTitleSmall as="div" title="{values.email}"><strong>{values.email}</strong></ModalBlockTitleSmall>
                              </UnstyledHeading>
                            </FlexItem>
                          </SplitWithChildMargin>
                        </FlexItem>
                      </FlexContainer>
                      <ModalBlockSpacer size="small" />
                      <InputWithValidation
                        label="Password"
                        name="password"
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        values={values} 
                        errors={errors}
                        touched={touched}
                        control={
                          <Input type="password" autoComplete="new-password"/>
                        } />
                      <ModalBlockSpacer size="default" />
                      <FlexContainer justifyContent="flex-end">
                        <FlexItem auto>
                          <PrimaryButton buttonSpacing={3} type="submit">
                            <FlexContainer alignItems="center">
                              <SplitWithChildMargin gutter={spacing[0]}>
                                <FlexItem>Sign In</FlexItem>
                              </SplitWithChildMargin>
                            </FlexContainer>
                          </PrimaryButton>
                      </FlexItem>
                      </FlexContainer>
                    </ModalPage>
                  </>}
                </ModalPager>
              </form>
              {/* <pre>{JSON.stringify(errors, '\t')}</pre>
              <pre>{JSON.stringify(touched, '\t')}</pre> */}
            </React.Fragment>
          )} />
        </ModalBlock>
      </CenterContainer>  
    </LandingBackground>
  );
}

export default EntryView;
