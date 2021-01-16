// Slice of the store
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from './middleware/networkCallActions';
import { loginUrl, logoutUrl, savedSettingsUrl, setSavedSettingsUrl } from '../constants';
import * as viewTypes from '../viewTypes';

////////////////////////////////////////////////////////////////////////////////
// Reducer (creates an action also)
////////////////////////////////////////////////////////////////////////////////

const slice = createSlice({
    name: "user",
    initialState: {
        name: "",
        user: "",
        token: "",
        rto: "",
        views: [
            {
              title: "Variables",
              items: [ 
                viewTypes.powerFlowkW,
                viewTypes.powerFlowPercent,
                viewTypes.status,
                viewTypes.soc,
                viewTypes.temperature,
              ],
            },
          ],
        settings: {
            updateInterval: 10000, 
            squareSize: 10
        },
        loading: false,
        lastFetch: null,
        errors: {} 
    },
    reducers: {
        userNewListReceived: (user, action) => { 
            user.views = action.payload;
        },
        userToggledView: (user, action) => {
            const viewIndex = action.payload;
            user.views[0].items[viewIndex].shouldShow = !user.views[0].items[viewIndex].shouldShow;
        },
        userRequestFailed: (user, action) => {
            user.loading = false;
            user.errors = action.payload;
        },
        userRequested: (user, action) => {
            user.loading = true;
            user.errors = {};
        },
        userSavedSettingsRetreived: (user, action) => {
            console.log(action.payload.settings);
            user.settings = action.payload.settings;
        },
        userSavedSettingsSet: (user, action) => {
            console.log(action.payload);
            //user.settings = action.payload.settings;
        },
        userLoggedOut: (user, action) => {
            user.name = "";
            user.token = "";
            user.user = "";
            user.rto = "";
            user.timerIntervals = {};
        },
        userReceived: (user, action) => {
            // bad login credentials
            if (action.payload.__errors__) {
                user.errors = action.payload.__errors__;
                user.loading = false;
            }
            // succeess logging in
            else {
                user.name = action.payload.name;
                user.user = action.payload.user;
                user.token = action.payload.token;
                user.rto = action.rto;
                user.lastFetch = Date.now();
                user.loading = false;
                user.errors = {};
            }
        },
    }
});

const {
    userRequestFailed, 
    userRequested, 
    userReceived,
    userLoggedOut,
    userNewListReceived,
    userToggledView,
    userSavedSettingsRetreived,
    userSavedSettingsSet
} = slice.actions; 

export default slice.reducer;

////////////////////////////////////////////////////////////////////////////////
// Action Creators
////////////////////////////////////////////////////////////////////////////////

export const loginUser = (user, password, rto) => async (dispatch, getState) => {
    
    return dispatch(
        apiCallBegan({ 
            rto,
            url: loginUrl + `?user=${user}&password=${password}`,
            onStart: userRequested.type,
            onSuccess: userReceived.type,
            onError: userRequestFailed.type
        })
    );

};

export const logoutUser = () => (dispatch, getState) => {

    const {user, name, token} = getState().entities.user;

    return dispatch(
        apiCallBegan({
            url: logoutUrl + `?user=${user}&name=${name}&token=${token}`,
            onSuccess: userLoggedOut.type,
            onError: userRequestFailed.type
        }) 
    );
};

export const getSavedUserSettings = () => (dispatch, getState) => {

    const {user, name, token} = getState().entities.user;

    return dispatch(
        apiCallBegan({
            url: savedSettingsUrl + `?user=${user}&name=${name}&token=${token}`,
            onStart: userRequested.type,
            onSuccess: userSavedSettingsRetreived.type,
            onError: userRequestFailed.type
        })
    );
};

export const setSavedUserSettings = (updateInterval, squareSize) => (dispatch, getState) => {

    const {user, name, token} = getState().entities.user;

    // saves as "a","","c" with a as the name
    //const settings = [{"a": "", "": "", "c": ""}];   
     
    return dispatch( 
        apiCallBegan({
            url: setSavedSettingsUrl + `?user=${user}&name=${name}&token=${token}&settings=[{"updateInterval": "", "": "", "${updateInterval}": ""}, {"squareSize": "", "": "", "${squareSize}": ""}]`,
            onStart: userRequested.type,
            onSuccess: userSavedSettingsSet.type,
            onError: userRequestFailed.type
        })
    );
};

export const setViewList = (newList) => (dispatch) => {

    return dispatch(userNewListReceived(newList));
};

export const toggleView = (index) => (dispatch) => {

    return dispatch(userToggledView(index));
};