import axios from 'axios';
import * as actions from './networkCallActions';
import { rtoList } from '../../constants/rtos';
import { developmentURL } from '../../constants/urls';

const determineBaseURL = (rto) => {
  let url;

  if (process.env.NODE_ENV === 'development') {
    url = developmentURL;
  } else {
    url = rtoList.find((element) => rto === element.name).url;
    if (!url) url = rtoList[0].url;
  }

  return url;
};

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const {
    rto,
    url,
    method,
    data,
    onStart,
    onSuccess,
    onError,
    stateData,
  } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL: determineBaseURL(rto),
      url,
      method,
      data,
    });
    // General
    dispatch(actions.apiCallSuccess(response.data));
    // Specific
    if (onSuccess && stateData)
      dispatch({
        type: onSuccess,
        payload: { data: response.data, stateData },
      });
    else if (onSuccess)
      dispatch({ type: onSuccess, payload: response.data, rto });
    else {
    }
  } catch (error) {
    // General
    dispatch(actions.apiCallFailed(error.message));
    // Specific
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;
