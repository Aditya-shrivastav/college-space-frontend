import * as actionTypes from './actionTypes';
import { produce } from 'immer'

let initialState = {
  user: {},
  token: '',
  isAuthenticated: false,
  err: ''
}

export const loginReducer = produce((state = initialState, action) => {

  if (action.type === actionTypes.LOGIN_SUCCESS) {
    state.user = action.payload.response.user;
    state.token = action.payload.response.token;
    state.isAuthenticated = true
    state.err = '';
  }

  if (action.type === actionTypes.LOGIN_FAILED) {
    state.user = {};
    state.token = '';
    state.isAuthenticated = false;
    state.err = action.payload.err;
  }

}, initialState)