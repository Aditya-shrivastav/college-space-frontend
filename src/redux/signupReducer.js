import * as actionTypes from './actionTypes';
import { produce } from 'immer';

const initialState = {
    user: [],
    success: false,
    err: ''
}
export const signupReducer = produce((state, action) => {

    if (action.type === actionTypes.SIGNUP_FAILURE) {
        state.err = action.payload.err;
        state.success = false;
        state.user = [];
    }

    if (action.type === actionTypes.SIGNUP_SUCCESS) {
        state.user = action.payload.user;
        state.success = true;
        state.err = '';
    }

}, initialState)