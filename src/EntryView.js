import React, { useState, useEffect, useRef, useReducer } from 'react';
import { Formik } from 'formik';
import landingBG from './clientAssets/landing-bg.jpg';
import styled from '@emotion/styled/macro';
import { PrimaryButton, GhostIconButton } from './components/Buttons';
import ModalBlock from './components/ModalBlock';
import { AppBrandWithSubhead } from './components/AppBrand';
import { Heading4, UnstyledHeading, getComputedLineHeight } from './theme/commonType';
import Input from './components/Input';
import { FlexContainer, FlexItem } from './components/commonLayout';
import SplitWithChildMargin from './components/SplitWithChildMargin';
import { spacing } from './theme/theme';
import { typeScaleMap } from './theme/themeMapping';
import { Arrow } from './components/ArrowComponents';
import InputWithValidation from './components/InputWithValidation';
import * as Yup from 'yup';
import uuid from 'uuid4';
import ButtonLoaderShell from './components/ButtonLoaderShell';
import Pager, { Page } from './components/Pager';
import useDataApi from './hooks/useDataApi';

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
const usernamePromptInitialState = {
  // enteredUsername: undefined,
  queryStatus: undefined,
  queryString: undefined,
  results: undefined
}
const usernamePromptReducer = (state, action) => {
  switch (action.type) {
    case 'INIT': 
      return {
        ...usernamePromptInitialState
      }
    case 'RESET': 
      return {
        ...usernamePromptInitialState,
      }
    case 'LOOKUP_ATTEMPT':
      return {
        ...state,
        queryStatus: 'LOADING',
        queryString: action.payload,
      }
    case 'LOOKUP_SUCCESS': 
      return {
        queryStatus: 'SUCCESS',
        queryString: undefined,
        results: action.payload,
      }
    case 'LOOKUP_FAILURE': 
      return {
        ...state,
        queryStatus: 'FAILURE',
        results: undefined
      }
    default:
      throw new Error();
  }
}

const EntryView = () => {
  const [usernameAutofocus, setUsernameAutofocus] = useState(true);
  const [passwordAutofocus, setPasswordAutofocus] = useState(false);
  const [usernamePrompt, usernamePromptDispatch] = useReducer(usernamePromptReducer, usernamePromptInitialState);
  const [{ data: usernameQueryResult, isLoading, isError }, doFetch] = useDataApi(
    null, // url
    null, // initial result state
  );
  // The on-success function needs to be redefined later, since it will need to contain references not instantiated yet — things provided by the Formik render function, so we just re-define when we render to that depth of the component tree.
  const onUsernameQuerySuccess = useRef();

  // Username validity fetching
  useEffect(() => {
    const query = usernamePrompt.queryString;
    console.log('maybe querying', query);
    if (query && query.length) {
      doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`)
    }
    // Gotta clear the fetch hook's pipeline in case the user wants to make the same query again
    else doFetch(null);
  }, [doFetch, usernamePrompt.queryString]);
  useEffect(() => {
    if (isError) {
      console.log("isError", isError);
      usernamePromptDispatch({type: 'LOOKUP_FAILURE'})
    }
  }, [isError])

  // Processing Username-prompt specific states
  useEffect(() => {
    console.log("usernameQueryResult", usernameQueryResult);
    if (!usernameQueryResult) return;
    if (usernameQueryResult && usernameQueryResult.hits && usernameQueryResult.hits.length) {
      usernamePromptDispatch({type: 'LOOKUP_SUCCESS', payload: usernameQueryResult.hits})
    }
    else usernamePromptDispatch({type: 'LOOKUP_FAILURE'})
  }, [usernameQueryResult])
  useEffect(() => {
    const status = usernamePrompt.queryStatus;
    console.log("status", status);
    if (status === 'SUCCESS') onUsernameQuerySuccess.current();
    // Refresh autofocus on the Username field
    if (status === 'FAILURE') setUsernameAutofocus(uuid());
  }, [usernamePrompt.queryStatus])
  
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
            render={({ handleSubmit, handleChange, handleBlur, setTouched, setFieldValue, isSubmitting, values, errors, touched }) => (
            <React.Fragment>
              <form onSubmit={handleSubmit}>
                <AppBrandWithSubhead large />
                <ModalBlockSpacer size="small" />
                  <Pager>{({currentPage, transitionDirection}, pagerDispatch) => {
                    const submitUsername = () => {
                      if (values.email && values.email.length) {
                        usernamePromptDispatch({
                          type: 'LOOKUP_ATTEMPT',
                          payload: values.email
                        })
                      }
                      // if (values.email && values.email.length) setUsernameQuery(values.email);
                    };
                    onUsernameQuerySuccess.current = () => {
                      // setUsernameQuery(undefined);
                      usernamePromptDispatch({type: 'LOOKUP_SUCCESS'});
                      setPasswordAutofocus(false);
                      values.email && !errors.email && pagerDispatch({type: 'increment'});
                      setTouched({...touched, email: true});
                    }
                    const backToUsernameEntry = () => {
                      usernamePromptDispatch({type: 'RESET'});
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
                          <ModalBlockSpacer size="default" />
                          <FlexContainer justifyContent="flex-end">
                            <FlexItem auto>
                              {/* TODO: Replace this with an icon-button pattern */}
                              <PrimaryButton
                                buttonSpacing={3}
                                onClick={submitUsername}>
                                <ButtonLoaderShell>
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
                        </Page>
                        <Page
                          key={1}
                          page={1}
                          transitionDirection={transitionDirection}
                          onPoseComplete={() => {
                            setPasswordAutofocus(true)
                          }}
                          currentPage={currentPage}>
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
                          <ModalBlockSpacer size="default" />
                          <FlexContainer justifyContent="flex-end">
                            <FlexItem auto>
                              <PrimaryButton
                                buttonSpacing={3} type="submit" isDisabled={isSubmitting || !values.password}>
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
                        </Page>
                      </React.Fragment>
                    )}
                  }
                </Pager>
              </form>
              {usernamePrompt.queryStatus === 'FAILURE' && <strong>OH NOES <em>{usernamePrompt.queryString}</em> was bad</strong>}
            </React.Fragment>
          )} />
        </ModalBlock>
      </CenterContainer>  
    </LandingBackground>
  );
}

export default EntryView;
