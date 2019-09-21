import { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import uuid from 'uuid4';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      // console.log('FETCH_INIT');
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      console.log('FETCH_SUCCESS', action.payload);
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      // console.log('FETCH_FAILURE', action.payload);
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: action.payload
      };
    default:
      throw new Error();
  }
};

const useDataApi = (initialEndpoint, initialData) => {
  const [endpoint, setEndpoint] = useState(initialEndpoint);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  useEffect(() => {
    if (endpoint) {
      let didCancel = false;
      const fetchData = async () => {
        dispatch({ type: 'FETCH_INIT' });
        try {
          const result = (typeof endpoint === 'string')
            ? await axios(endpoint)
            : await endpoint
          
          if (!didCancel) {
            dispatch({ type: 'FETCH_SUCCESS', payload: {
              data: result,
              key: uuid()
            }});
          }
        } catch (error) {
          if (!didCancel) {
            dispatch({ type: 'FETCH_FAILURE', payload: {
              error: error,
              key: uuid()
            }});
          }
        }
      };
      fetchData();
      return () => {
        didCancel = true;
      };
    }
  }, [endpoint]);
  return [state, setEndpoint];
};

export default useDataApi;