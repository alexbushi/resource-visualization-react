import { combineReducers } from 'redux';
import slicesCombiner from './slicesCombiner'; 

export default combineReducers({
    entities: slicesCombiner,
});