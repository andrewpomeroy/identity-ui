import { useReducer, useEffect } from 'react';
import useValidationResponseHandler from './useValidationResponseHandler';
import useDataApi from './useDataApi';

const _initialState = {
  queryStatus: undefined,
  query: undefined,
  lastFailedQuery: undefined
}
const _reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': 
    case 'RESET': 
      return {
        ..._initialState
      }
    case 'VALIDATE_ATTEMPT':
      return {
        ...state,
        queryStatus: 'LOADING',
        query: action.payload,
        lastFailedQuery: null
      }
    case 'VALIDATE_SUCCESS': 
      return {
        queryStatus: 'SUCCESS',
        query: null,
      }
    case 'VALIDATE_FAILURE': 
      console.log("VALIDATE_FAILURE", action.payload);
      return {
        ...state,
        queryStatus: 'FAILURE',
        query: null,
        errors: action.payload.errors,
        lastFailedQuery: state.query
      }
    case 'VALIDATE_ERROR': 
      return {
        ...state,
        queryStatus: 'FAILURE',
        query: null,
        errors: [action.payload.error],
        lastFailedQuery: state.query
      }
    default:
      throw new Error();
  }
}

const useValidateField = (queryFn) => {
  const [reducer, dispatch] = useReducer(_reducer, _initialState);
  // TODO: Break this out. Pass in via hook composition
  const [{ data: response, isLoading, isError }, setQuery] = useDataApi(
    undefined, // url
    undefined, // initial result state
  );
  useEffect(() => {
    const query = reducer.query;
    if (query) {
      setQuery(() => queryFn(query));
    }
    else {
      // Gotta clear the fetch hook's pipeline in case the user wants to make the same query again
      // Pass through null (clear) or undefined (init)
      setQuery(query);
    }
  }, [queryFn, reducer.query, setQuery]);
  // useValidationResponseHandler(response, dispatch);
  useEffect(() => {
    if (isError) {
      dispatch({type: 'VALIDATE_ERROR', payload: response.error})
    }
    if (response && response.data) {
      dispatch(response.data.isSuccess
        ? {type: 'VALIDATE_SUCCESS'}
        : {type: 'VALIDATE_FAILURE', payload: response.data.errors});
    }
  }, [response, isError])

  return [reducer, dispatch];
}

export default useValidateField;