import * as actionTypes from './actionTypes';
import { produce } from 'immer'

let initialState = {
  token: '',
  isAuthenticated: false,
  err: ''
}

export const loginReducer = produce((state = initialState, action) => {

  if (action.type === actionTypes.LOGIN_SUCCESS) {
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