import produce from 'immer';
import * as actionTypes from './actionTypes';

let initialState = {
    user: {},
    attendance: [],
    success: false,
    err: ''
}

export const userReducer = produce((state = initialState, action) => {
    if (action.type === actionTypes.GET_USER_SUCCESS) {
        state.user = action.payload.creds;
        state.success = true;
        state.err = '';
    }
    if (action.type === actionTypes.GET_USER_FAILURE) {
        state.user = {};
        state.success = false;
        state.err = action.payload.err;
        state.attendance = [];
    }

    if (action.type === actionTypes.FETCH_ATTENDANCE_SUCCESS) {
        state.attendance = action.payload.creds;
    }
}, initialState);