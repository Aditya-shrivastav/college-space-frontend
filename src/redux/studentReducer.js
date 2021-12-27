import produce from 'immer';
import * as actionTypes from './actionTypes';

let initialState = {
    attendance: [],
    courses: [],
    timeTable: {},
    unreadEvents: false
}

export const studentReducer = produce((state = initialState, action) => {

    if (action.type === actionTypes.FETCH_ATTENDANCE_SUCCESS) {
        state.attendance = action.payload.creds;
    }

    if (action.type === actionTypes.FETCH_STUDENT_COURSE_SUCCESS) {
        state.courses = action.payload.creds;
    }

    if (action.type === actionTypes.FETCH_STUDENT_TIME_TABLE) {
        state.timeTable = action.payload.creds;
    }

    if (action.type === actionTypes.FETCH_EVENT_SUCCESS) {
        state.unreadEvents = action.payload.creds;
    }

}, initialState);