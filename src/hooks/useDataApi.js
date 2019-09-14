import { useState, useReducer, useEffect } from 'react';
import axios from 'axios';

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

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  useEffect(() => {
    if (url) {
      console.log("doing query with", url);
      let didCancel = false;
      const fetchData = async () => {
        dispatch({ type: 'FETCH_INIT' });
        try {
          const result = await axios(url);
          if (!didCancel) {
            dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
          }
        } catch (error) {
          if (!didCancel) {
            console.log(error);
            dispatch({ type: 'FETCH_FAILURE', payload: error });
          }
        }
      };
      fetchData();
      return () => {
        didCancel = true;
      };
    }
  }, [url]);
  return [state, setUrl];
};

export default useDataApi;