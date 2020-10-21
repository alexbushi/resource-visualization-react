import { combineReducers } from 'redux';
import resourcesReducer from './resources';
import userReuducer from './user';

export default combineReducers({
    resources: resourcesReducer,
    user: userReuducer
});