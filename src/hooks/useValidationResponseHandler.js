import { useEffect } from 'react';

const useValidationResponseHandler = (queryResult, dispatch, actionTypes = {}) => {
  return useEffect(() => {
    console.log("queryResult", queryResult);
    // null should clear the pipeline, for re-init/reset states
    const result = queryResult == null ? queryResult : queryResult.data;
    switch (result) {
      case undefined:
        break;
      case null: 
        dispatch({type: actionTypes.reset || 'RESET'});
        break;
      case true: 
        dispatch({type: actionTypes.success || 'VALIDATE_SUCCESS', payload: result});
        break;
      case false:
        dispatch({type: actionTypes.failure || 'VALIDATE_FAILURE'})
        break;
      default: 
        dispatch({type: actionTypes.init || "INIT"});
    }
  }, [actionTypes.failure, actionTypes.init, actionTypes.reset, actionTypes.success, dispatch, queryResult])
}
export default useValidationResponseHandler;