import React, { useState, useReducer } from 'react';
import { Formik } from 'formik';
import landingBG from './clientAssets/landing-bg.jpg';
import styled from '@emotion/styled/macro';
import { PrimaryButton, GhostButton, GhostIconButton, IconButton } from './components/Buttons';
import ModalBlock from './components/ModalBlock';
import AppBrand, { AppBrandWithSubhead } from './components/AppBrand';
import { Heading4, UnstyledH2, UnstyledHeading, getComputedLineHeight } from './theme/commonType';
import Input, { InputLabel, DecoratedInput } from './components/Input';
import { FlexContainer, FlexItem } from './components/commonLayout';
import arrowSvg from './icons/arrow.svg';
import SplitWithChildMargin from './components/SplitWithChildMargin';
import { spacing } from './theme/theme';
import { typeScaleMap } from './theme/themeMapping';
import { Arrow, Chevron } from './components/ArrowComponents';
import InputWithValidation from './components/InputWithValidation';
import * as Yup from 'yup';
import uuid from 'uuid4';
import posed, { PoseGroup } from 'react-pose';
import ButtonLoaderShell from './components/ButtonLoaderShell';

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

const ModalPagerDom = styled.div`
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
        transitionDirection: (action.value < state.currentPage
          ? -1
          : action.value > state.currentPage
            ? 1
            : 0),
        currentPage: action.value
      }
    default: 
      throw new Error('wtf', action)
  }
}

const ModalPager = ({children, ...props}) => {
  const [pager, pagerDispatch] = useReducer(pagerReducer, pagerInitialState);

  return (
      <ModalPagerDom>
        {children(pager, pagerDispatch)}
      </ModalPagerDom>
  )
}

const transition = {
  x: {
    duration: 400,
    ease: 'easeOut'
  }
};

const ModalPage = posed.div({
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

function EntryView() {
  const [passwordAutofocus, setPasswordAutofocus] = useState(false);
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
                alert("Success! \n\n" + JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
            render={({ handleSubmit, handleChange, handleBlur, setValues, setTouched, isSubmitting, values, errors, touched }) => (
            <React.Fragment>
              <form onSubmit={handleSubmit}>
                <AppBrandWithSubhead large />
                <ModalBlockSpacer size="small" />
                <ModalPager>{({currentPage, transitionDirection}, pagerDispatch) => 
                  <PoseGroup preEnterPose="enter"
                    enterPose="default"
                    exitPose="exit">
                    {currentPage === 0 && 
                      <ModalPage
                        key={0}
                        page={0}
                        transitionDirection={transitionDirection}
                        currentPage={currentPage}>
                        <ModalBlockTitle as="div">&nbsp;</ModalBlockTitle>
                        <ModalBlockTitle as="h2">Sign in to your account</ModalBlockTitle>
                        <ModalBlockSpacer size="small" />
                        <InputWithValidation 
                          label="Email Address" 
                          name="email" 
                          onEnterKey={() => {
                              setPasswordAutofocus(false);
                              values.email && !errors.email && pagerDispatch({type: 'increment'});
                              setTouched({...touched, email: true});
                          }}
                          onChange={handleChange} 
                          onBlur={handleBlur} 
                          values={values} 
                          errors={errors}
                          touched={touched}
                          control={
                            <Input autoComplete={uuid()} willAutoFocus={true} />
                          } />
                        <ModalBlockSpacer size="default" />
                        <FlexContainer justifyContent="flex-end">
                          <FlexItem auto>
                            {/* TODO: Replace this with an icon-button pattern */}
                            <PrimaryButton
                              buttonSpacing={3}
                              onClick={() => {
                                setPasswordAutofocus(false);
                                values.email && !errors.email && pagerDispatch({type: 'increment'});
                                setTouched({...touched, email: true});
                              }}>
                              <ButtonLoaderShell>
                                <FlexContainer alignItems="center">
                                  <SplitWithChildMargin gutter={8}>
                                    <FlexItem>Next</FlexItem>
                                    <FlexItem auto style={{marginTop: -5, marginBottom: -5}}>
                                      <Arrow></Arrow>
                                    </FlexItem>
                                  </SplitWithChildMargin>
                                </FlexContainer>
                              </ButtonLoaderShell>
                            </PrimaryButton>
                        </FlexItem>
                        </FlexContainer>
                      </ModalPage>
                    }
                    {currentPage === 1 &&                     
                      <ModalPage
                        key={1}
                        page={1}
                        transitionDirection={transitionDirection}
                        onPoseComplete={() => {
                          setPasswordAutofocus(true)}
                        }
                        currentPage={currentPage}>
                        <FlexContainer flexDirection="column" justifyContent="flex-end" style={{height: getComputedLineHeight('h4') * 2}}>
                          <FlexItem auto>
                            <SplitWithChildMargin gutter={8}>
                              <FlexItem auto>
                                <GhostIconButton
                                  onClick={() => {
                                    setValues({...values, password: ''});
                                    setTouched({...touched, password: false});
                                    pagerDispatch({type: 'decrement'})
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
                          allowEnterKey={true}
                          onChange={handleChange} 
                          onBlur={handleBlur} 
                          values={values} 
                          errors={errors}
                          touched={touched}
                          control={
                            <Input type="password" autoComplete={uuid()} willAutoFocus={passwordAutofocus}/>
                          } />
                        <ModalBlockSpacer size="default" />
                        <FlexContainer justifyContent="flex-end">
                          <FlexItem auto>
                            <PrimaryButton buttonSpacing={3} type="submit">
                              <ButtonLoaderShell isLoading={isSubmitting} disabled={isSubmitting}>
                                <FlexContainer alignItems="center">
                                  <SplitWithChildMargin gutter={spacing[0]}>
                                    <FlexItem>Sign In</FlexItem>
                                  </SplitWithChildMargin>
                                </FlexContainer>
                              </ButtonLoaderShell>
                            </PrimaryButton>
                        </FlexItem>
                        </FlexContainer>
                      </ModalPage>
                    }
                  </PoseGroup>
                }</ModalPager>
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
