import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import MainView from './MainView';
// import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Global, css } from '@emotion/core';
import { MainContextProvider } from './context/MainContext';
import { theme, extendedTheme } from './theme/theme';

const globalStyles = css`
  body, input, button, textarea, select, h1, h2, h3, h4, h5, h6 {
    /* font-family: inherit; */
  }
  html, body {
    height: 100vh;
    width: 100vw;
  }
  body, #root {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
  }
`

function App(props) {
  
  return (
    <>
      <Global styles={globalStyles}></Global>
      {/* <ThemeProvider theme={theme}> */}
      <ThemeProvider theme={extendedTheme}>
        <MainContextProvider>
          <MainView></MainView>
        </MainContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
