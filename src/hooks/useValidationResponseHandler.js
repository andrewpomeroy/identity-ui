import { useEffect } from 'react';

const useValidationResponseHandler = (queryResult, dispatch, actionTypes = {}) => {
  return useEffect(() => {
    if (!queryResult) {
      return;
    }
    console.log("queryResult", queryResult);
    const data = queryResult.data;
    switch (data.isSuccess) {
      case true: 
        dispatch({type: actionTypes.success || 'VALIDATE_SUCCESS'})
        break;
      case false:
        dispatch({type: actionTypes.failure || 'VALIDATE_FAILURE', payload: data.errors});
        break;
      default:
        dispatch({type: actionTypes.error || 'ERROR'})
    }
  }, [actionTypes.failure, actionTypes.success, actionTypes.error, dispatch, queryResult])
}
export default useValidationResponseHandler;