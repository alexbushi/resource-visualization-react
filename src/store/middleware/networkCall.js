import axios from 'axios';
import * as actions from './networkCallActions';
//import { baseURL } from '../../constants';
import { determineBaseURL } from '../../constants';

const api = ({ dispatch }) => next => async action => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { rto, url, method, data, onStart, onSuccess, onError, stateData } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action); 
    
    try {
        const baseUrl = determineBaseURL(rto);
        // console.log('here in api handler:', baseUrl); 
        // console.log(baseURL); 

        const response = await axios.request({ 
            //baseURL,
            baseURL: baseUrl,
            url,
            method,
            data
        });
        // General
        dispatch(actions.apiCallSuccess(response.data));
        // Specific
        if (onSuccess && stateData) dispatch({type: onSuccess, payload: {data: response.data, stateData}})
        else if (onSuccess) dispatch({type: onSuccess, payload: response.data, rto});
        else {}

    } catch(error) {
        // General
        dispatch(actions.apiCallFailed(error.message));
        // Specific
        if (onError) dispatch({type: onError, payload: error.message});
    } 
}

export default api;