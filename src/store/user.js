// Slice of our store
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from './middleware/networkCallActions';
import { loginUrl, logoutUrl } from './constants';

////////////////////////////////////////////////////////////////////////////////
// Reducer (creates an action also)
////////////////////////////////////////////////////////////////////////////////

const slice = createSlice({
    name: "user",
    initialState: {
        name: null,
        user: null,
        // Need to securely store token
        token: null,
        // What happens when user logs out, need persistence
        timerIntervals: {
            soc: 10,
            powerkW: 10,
            temperature: 10,
            powerPercent: 10,
        },
        loading: false,
        lastFetch: null
    },
    reducers: {
        userRequestFailed: (user, action) => {
            user.loading = false;
        },
        userRequested: (user, action) => {
            user.loading = true;
        },
        userLoggedOut: (user, action) => {
            user.name = null,
            user.token = null,
            user.user = null,
            user.timerIntervals = null
        },
        userReceived: (user, action) => {
            user.name = action.payload.name;
            user.user = action.payload.user;
            // TODO: Need to securely store token
            user.token = action.payload.token
            user.loading = false;
            user.lastFetch = Date.now();
        },
    }
});

const {
    userRequestFailed, 
    userRequested, 
    userReceived,
    userLoggedOut
} = slice.actions;

export default slice.reducer;

////////////////////////////////////////////////////////////////////////////////
// Action Creators
////////////////////////////////////////////////////////////////////////////////

export const loginUser = (user, password) => (dispatch, getState) => {

    return dispatch(
        apiCallBegan({
            // TODO: research how to pass password
            url: loginUrl + `?user=${user}&password=${password}`,
            onStart: userRequested.type,
            onSuccess: userReceived.type,
            onError: userRequestFailed.type
        })
    );
};

export const logoutUser = (user, name, token) => (dispatch, getState) => {

    return dispatch(
        apiCallBegan({
            url: logoutUrl + `?user=${user}&name=${name}&token=${token}`,
            onSuccess: userLoggedOut.type,
            onError: userRequestFailed.type
        })
    );
};

export const getTimerInvervals = () => (dispatch, getState) => {
    return getState().entities.user.timerIntervals;
}