import React, { useState, useEffect, useRef } from 'react';
import { Formik } from 'formik';
import landingBG from './clientAssets/landing-bg.jpg';
import styled from '@emotion/styled/macro';
import { PrimaryButton, GhostIconButton } from './components/Buttons';
import { ModalBlockWithRows, ModalBlockRow, ModalBlockSpacer, ModalBlockTitle, ModalBlockTitleSmall } from './components/ModalBlock';
import { AppBrandWithSubhead } from './components/AppBrand';
import { UnstyledHeading, getComputedLineHeight } from './theme/commonType';
import Input from './components/Input';
import { FlexContainer, FlexItem } from './components/commonLayout';
import SplitWithChildMargin from './components/SplitWithChildMargin';
import { spacing } from './theme/theme';
import { Arrow } from './components/ArrowComponents';
import InputWithValidation from './components/InputWithValidation';
import * as Yup from 'yup';
import uuid from 'uuid4';
import ButtonLoaderShell from './components/ButtonLoaderShell';
import Pager, { Page } from './components/Pager';
import { validateUsername, authenticate } from './services/mockAuthServices';
import Alert from './components/Alert';
import useValidateField from './hooks/useValidateField';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
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

const EntryView = () => {
  const [usernameAutofocus, setUsernameAutofocus] = useState(true);
  const [passwordAutofocus, setPasswordAutofocus] = useState(false);
  const [usernamePrompt, usernamePromptDispatch] = useValidateField(validateUsername);
  const [passwordPrompt, passwordPromptDispatch] = useValidateField(authenticate);
  
  // The on-success function needs to be redefined later, since it will need to contain references not instantiated yet — things provided by the Formik render function, so we just re-define when we render to that depth of the component tree.
  const onUsernameQuerySuccess = useRef();

    // Processing Username-prompt specific states
  useEffect(() => {
    const status = usernamePrompt.queryStatus;
    if (status === 'SUCCESS') onUsernameQuerySuccess.current();
    // Refresh autofocus on the Username field
    if (status === 'FAILURE') setUsernameAutofocus(uuid());
  }, [usernamePrompt.queryStatus])

  useEffect(() => {
    const status = passwordPrompt.queryStatus;
    if (status === 'SUCCESS') alert('Success!')
    if (status === 'FAILURE') console.log(passwordPrompt);
  }, [passwordPrompt, passwordPrompt.queryStatus])

  return (
    <LandingBackground>
      <CenterContainer>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            validateOnChange={true}
            onSubmit={(values, actions) => {
              // setTimeout(() => {
              //   alert("Success! \n\n" + JSON.stringify(values, null, 2));
              //   actions.setSubmitting(false);
              // }, 1000);
              passwordPromptDispatch({
                type: 'VALIDATE_ATTEMPT',
                payload: {username: values.email, password: values.password}
              })
            }}
            render={({ handleSubmit, handleChange, handleBlur, setTouched, setFieldValue, isSubmitting, values, errors, touched }) => (
            <React.Fragment>
              <ModalBlockWithRows>
                <form onSubmit={handleSubmit}>
                  <ModalBlockRow>
                    <AppBrandWithSubhead large />
                    <ModalBlockSpacer size="small" />
                  </ModalBlockRow>
                  <Pager>{({currentPage, transitionDirection}, pagerDispatch) => {
                    const submitUsername = () => {
                      if (values.email && values.email.length) {
                        usernamePromptDispatch({
                          type: 'VALIDATE_ATTEMPT',
                          payload: values.email
                        })
                      }
                    };
                    onUsernameQuerySuccess.current = () => {
                      usernamePromptDispatch({type: 'VALIDATE_SUCCESS'});
                      setPasswordAutofocus(false);
                      values.email && !errors.email && pagerDispatch({type: 'increment'});
                      setTouched({...touched, email: true});
                    }
                    const backToUsernameEntry = () => {
                      usernamePromptDispatch({type: 'RESET'});
                      passwordPromptDispatch({type: 'RESET'});
                      setTouched({...touched, password: false});
                      setFieldValue('password', '')
                      // Prevent some weirdness with setFieldValue being async, trying to transition while changing values
                      // Not a *real* solution. Still an open issue: https://github.com/jaredpalmer/formik/issues/529
                      setTimeout(() => {
                        pagerDispatch({type: 'decrement'})
                      }, 0);
                    };

                    return (
                      <React.Fragment>
                        <Page
                          key={0}
                          page={0}
                          transitionDirection={transitionDirection}
                          currentPage={currentPage}>
                          <ModalBlockRow>

                            <ModalBlockTitle as="div">&nbsp;</ModalBlockTitle>
                            <ModalBlockTitle as="h2">Sign in to your account</ModalBlockTitle>
                            <ModalBlockSpacer size="small" />
                            <InputWithValidation 
                              label="Email Address" 
                              name="email" 
                              onEnterKey={submitUsername}
                              onChange={handleChange} 
                              onBlur={handleBlur} 
                              values={values} 
                              errors={errors}
                              touched={touched}
                              control={
                                <Input autoComplete={uuid()} willAutoFocus={usernameAutofocus} />
                              } />
                            {usernamePrompt.queryStatus === 'FAILURE' ?
                              <>
                                <Alert>Sorry, the username <strong>{usernamePrompt.attemptedQueryString}</strong> is not registered in the system.</Alert>
                                <ModalBlockSpacer size="small" />
                              </>
                              : <ModalBlockSpacer size="default" />
                            }
                            <FlexContainer justifyContent="flex-end">
                              <FlexItem auto>
                                {/* TODO: Replace this with an icon-button pattern */}
                                <PrimaryButton
                                  buttonSpacing={3}
                                  onClick={submitUsername}
                                  isDisabled={!values.email || errors.email || usernamePrompt.queryStatus === "LOADING" || usernamePrompt.attemptedQueryString === values.email}>
                                  <ButtonLoaderShell isLoading={usernamePrompt.queryStatus === "LOADING"}>
                                    <FlexContainer alignItems="center">
                                      <SplitWithChildMargin gutter={8}>
                                        <FlexItem>Next</FlexItem>
                                        <FlexItem auto style={{marginTop: -5, marginBottom: -5}}>
                                          <Arrow size={20}></Arrow>
                                        </FlexItem>
                                      </SplitWithChildMargin>
                                    </FlexContainer>
                                  </ButtonLoaderShell>
                                </PrimaryButton>
                            </FlexItem>
                            </FlexContainer>
                          </ModalBlockRow>
                        </Page>
                        <Page
                          key={1}
                          page={1}
                          transitionDirection={transitionDirection}
                          onPoseComplete={() => {
                            setPasswordAutofocus(true)
                          }}
                          currentPage={currentPage}>
                          <ModalBlockRow>

                            <FlexContainer flexDirection="column" justifyContent="flex-end" style={{height: getComputedLineHeight('h4') * 2}}>
                              <FlexItem auto>
                                <SplitWithChildMargin gutter={8}>
                                  <FlexItem auto>
                                    <GhostIconButton
                                      onClick={backToUsernameEntry}
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
                              {passwordPrompt.errors && passwordPrompt.errors.length ?
                              <>
                                {passwordPrompt.errors.map((error, index) => <Alert key={index}>{error}</Alert>)}
                                <ModalBlockSpacer size="small" />
                              </>
                              : <ModalBlockSpacer size="default" />}
                            <FlexContainer justifyContent="flex-end">
                              <FlexItem auto>
                                <PrimaryButton
                                  buttonSpacing={3}
                                  type="submit"
                                  isDisabled={!values.password || errors.password || passwordPrompt.queryStatus === "LOADING"}>
                                  <ButtonLoaderShell isLoading={passwordPrompt.queryStatus === "LOADING"} disabled={!values.password || errors.password || passwordPrompt.queryStatus === "LOADING"}>
                                    <FlexContainer alignItems="center">
                                      <SplitWithChildMargin gutter={spacing[0]}>
                                        <FlexItem>Sign In</FlexItem>
                                      </SplitWithChildMargin>
                                    </FlexContainer>
                                  </ButtonLoaderShell>
                                </PrimaryButton>
                              </FlexItem>
                            </FlexContainer>
                          </ModalBlockRow>
                        </Page>
                      </React.Fragment>
                    )}
                  }</Pager>
                </form>
              </ModalBlockWithRows>
            </React.Fragment>
          )} />
      </CenterContainer>  
    </LandingBackground>
  );
}

export default EntryView;