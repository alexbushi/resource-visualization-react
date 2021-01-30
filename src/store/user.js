// Slice of the store
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './middleware/networkCallActions';
import {
  loginUrl,
  logoutUrl,
  getSettingsUrl,
  //setSettingsUrl,
} from '../constants/urls';
import * as viewTypes from '../constants/viewTypes';

////////////////////////////////////////////////////////////////////////////////
// Reducer (creates an action also)
////////////////////////////////////////////////////////////////////////////////

const slice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    user: '',
    token: '',
    rto: '',
    views: [
      {
        title: 'Variables',
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
      refreshRate: 10,
      squareSize: 32,
    },
    loading: false,
    lastFetch: null,
    errors: null,
  },
  reducers: {
    userNewListReceived: (user, action) => {
      user.views = action.payload;
    },
    userToggledView: (user, action) => {
      const viewIndex = action.payload;
      user.views[0].items[viewIndex].shouldShow = !user.views[0].items[
        viewIndex
      ].shouldShow;
    },
    userRequestFailed: (user, action) => {
      user.loading = false;
      user.errors = action.payload;
    },
    userRequested: (user, action) => {
      user.loading = true;
      user.errors = null;
    },
    userSettingsRetreived: (user, action) => {
      console.log(action.payload.settings);
      user.settings = action.payload.settings;
    },
    userSettingsSet: (user, action) => {
      console.log(action.payload);
      const settings = action.payload;
      if (settings.refreshRate)
        user.settings.refreshRate = parseInt(settings.refreshRate);
      if (settings.squareSize)
        user.settings.squareSize = parseInt(settings.squareSize);
    },
    userLoggedOut: (user, action) => {
      user.name = '';
      user.token = '';
      user.user = '';
      user.rto = '';
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
        user.errors = null;
      }
    },
  },
});

const {
  userRequestFailed,
  userRequested,
  userReceived,
  userLoggedOut,
  userNewListReceived,
  userToggledView,
  userSettingsRetreived,
  userSettingsSet,
} = slice.actions;

export default slice.reducer;

////////////////////////////////////////////////////////////////////////////////
// Action Creators
////////////////////////////////////////////////////////////////////////////////

export const loginUser = (user, password, rto) => async (
  dispatch,
  getState
) => {
  return dispatch(
    apiCallBegan({
      rto,
      url: loginUrl + `?user=${user}&password=${password}`,
      onStart: userRequested.type,
      onSuccess: userReceived.type,
      onError: userRequestFailed.type,
    })
  );
};

export const logoutUser = () => (dispatch, getState) => {
  const { user, name, token } = getState().entities.user;

  return dispatch(
    apiCallBegan({
      url: logoutUrl + `?user=${user}&name=${name}&token=${token}`,
      onSuccess: userLoggedOut.type,
      onError: userRequestFailed.type,
    })
  );
};

export const getUserSettings = () => (dispatch, getState) => {
  const { user, name, token } = getState().entities.user;

  return dispatch(
    apiCallBegan({
      url: getSettingsUrl + `?user=${user}&name=${name}&token=${token}`,
      onStart: userRequested.type,
      onSuccess: userSettingsRetreived.type,
      onError: userRequestFailed.type,
    })
  );
};

export const setUserSettings = (updatedSettings) => (dispatch, getState) => {
  //const { user, name, token } = getState().entities.user;

  //   return dispatch(
  //     apiCallBegan({
  //       url:
  //         setSettingsUrl +
  //         `?user=${user}&name=${name}&token=${token}&settings=[]`,
  //       onStart: userRequested.type,
  //       onSuccess: userSettingsSet.type,
  //       onError: userRequestFailed.type,
  //     })
  //   );

  return dispatch(userSettingsSet(updatedSettings));
};

export const setViewList = (newList) => (dispatch) => {
  return dispatch(userNewListReceived(newList));
};

export const toggleView = (index) => (dispatch) => {
  return dispatch(userToggledView(index));
};
