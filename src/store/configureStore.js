import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from './combinedReducers';
import api from './middleware/networkCall';

export default function() {
    return configureStore({ 
        reducer,
        middleware: [
            ...getDefaultMiddleware(),
            api
        ],
    });
};