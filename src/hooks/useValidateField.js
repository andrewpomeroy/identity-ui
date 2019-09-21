import { useReducer, useEffect } from 'react';
import useValidationResponseHandler from './useValidationResponseHandler';
import useDataApi from './useDataApi';

const _initialState = {
  queryStatus: undefined,
  queryString: undefined,
  attemptedQueryString: undefined
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
        queryString: action.payload,
        attemptedQueryString: null
      }
    case 'VALIDATE_SUCCESS': 
      return {
        queryStatus: 'SUCCESS',
        queryString: null,
      }
    case 'VALIDATE_FAILURE': 
      console.log("VALIDATE_FAILURE", action.payload);
      return {
        ...state,
        queryStatus: 'FAILURE',
        queryString: null,
        errors: action.payload.errors,
        attemptedQueryString: state.queryString
      }
    case 'VALIDATE_ERROR': 
      return {
        ...state,
        queryStatus: 'FAILURE',
        queryString: null,
        errors: [action.payload.error],
        attemptedQueryString: state.queryString
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
    const query = reducer.queryString;
    if (query && query.length) {
      setQuery(() => queryFn(query));
    }
    else {
      // Gotta clear the fetch hook's pipeline in case the user wants to make the same query again
      // Pass through null (clear) or undefined (init)
      setQuery(query);
    }
  }, [queryFn, reducer.queryString, setQuery]);
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