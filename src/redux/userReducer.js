import produce from 'immer';
import * as actionTypes from './actionTypes';

let initialState = {
    user: {},
    success: false,
    err: ''
}

export const userReducer = produce((state = initialState, action) => {
    if (action.type === actionTypes.GET_USER_SUCCESS) {
        console.log(action.payload.creds);
        state.user = action.payload.creds;
        state.success = true;
        state.err = '';
    }
    if (action.type === actionTypes.GET_USER_FAILURE) {
        state.user = {};
        state.success = false;
        state.err = action.payload.err;
    }
}, initialState);