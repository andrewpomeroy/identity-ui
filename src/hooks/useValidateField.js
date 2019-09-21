import { useReducer } from 'react';

const _defaultInitialState = {
  queryStatus: undefined,
  queryString: undefined,
  attemptedQueryString: undefined
}
let _initialState;
const _reducer = (state, action) => {
  if (!_initialState) _initialState = state;
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
      return {
        ...state,
        queryStatus: 'FAILURE',
        queryString: null,
        errors: action.payload.errors,
        attemptedQueryString: state.queryString
      }
    default:
      throw new Error();
  }
}

const useValidateField = (initialState) => {
  const [reducer, dispatch] = useReducer(_reducer, {..._defaultInitialState, ...initialState});
  return [reducer, dispatch];
}

export default useValidateField;