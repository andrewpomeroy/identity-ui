import { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import uuid from 'uuid4';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      console.log('FETCH_INIT');
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
      console.log('FETCH_FAILURE');
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
      console.log("doing query with", endpoint);
      let didCancel = false;
      const fetchData = async () => {
        dispatch({ type: 'FETCH_INIT' });
        try {
          let result;
          if (typeof endpoint === 'string') {
            result = await axios(endpoint);
          }
          else {
            result = await endpoint;
          }
          if (!didCancel) {
            dispatch({ type: 'FETCH_SUCCESS', payload: {
              data: result.data,
              key: uuid()
            }});
          }
        } catch (error) {
          if (!didCancel) {
            console.error(error);
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