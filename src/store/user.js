// Slice of the store
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from './middleware/networkCallActions';
import { loginUrl, logoutUrl } from '../constants';

////////////////////////////////////////////////////////////////////////////////
// Reducer (creates an action also)
////////////////////////////////////////////////////////////////////////////////

const slice = createSlice({
    name: "user",
    initialState: {
        name: "",
        user: "",
        token: "",
        // What happens when user logs out, need persistence
        timerIntervals: {
            soc: 10000,
            power: 2000,
            temperature: 10000,
        },
        views: [],
        loading: false,
        lastFetch: null,
        errors: {}
    },
    reducers: {
        userRequestFailed: (user, action) => {
            user.loading = false;
            user.errors = action.payload;
        },
        userRequested: (user, action) => {
            user.loading = true;
            user.errors = {};
        },
        userLoggedOut: (user, action) => {
            user.name = "";
            user.token = "";
            user.user = "";
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
                // localStorage.setItem('token', action.payload.token);
                user.token = action.payload.token
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
    userLoggedOut
} = slice.actions;

export default slice.reducer;

////////////////////////////////////////////////////////////////////////////////
// Action Creators
////////////////////////////////////////////////////////////////////////////////

export const loginUser = (user, password) => (dispatch, getState) => {

    return dispatch(
        apiCallBegan({
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