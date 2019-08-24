import React, { useReducer } from 'react';
// import { navigate } from '@reach/router';
// import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

const MainContext = React.createContext({});

const initialState = {
  searchIsActive: false,
}

const MainContextProvider = (props) => {
  const [state, dispatch] = useReducer(function reducer (state, action) {
    console.log(state, action);
    switch (action.type) {
      case 'openSearch':
        // navigate('/search');
        console.log(state);
        return { ...state, searchIsActive: true, redirectTo: '/search'} ;
      case 'closeSearch':
        return {...state, searchIsActive: false};
      default:
        return state;
    }
  },
  initialState);
  
  return (
    <MainContext.Provider value={{state, dispatch}}>
      {/* <Router basename="/connect"> */}
        {props.children}
      {/* </Router> */}
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider }