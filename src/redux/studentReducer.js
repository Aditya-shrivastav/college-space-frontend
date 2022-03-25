import produce from 'immer';
import * as actionTypes from './actionTypes';

let initialState = {
    attendance: [],
    courses: [],
    timeTable: {},
    unreadEvents: false,
    attendanceErr: null,
    timeTableErr: null,
    courseErr: null
}

export const studentReducer = produce((state = initialState, action) => {

    if (action.type === actionTypes.FETCH_ATTENDANCE_SUCCESS) {
        state.attendance = action.payload.creds;
        state.attendanceErr = null;
    }

    if (action.type === actionTypes.FETCH_STUDENT_COURSE_SUCCESS) {
        state.courses = action.payload.creds;
        state.courseErr = null;
    }

    if (action.type === actionTypes.FETCH_STUDENT_COURSE_FAILED) {
        state.courses = [];
        state.courseErr = action.payload.creds;
    }

    if (action.type === actionTypes.FETCH_STUDENT_TIME_TABLE_SUCCESS) {
        state.timeTable = action.payload.creds;
        state.timeTableErr = null;
    }

    if (action.type === actionTypes.FETCH_STUDENT_TIME_TABLE_FAILURE) {
        state.timeTableErr = action.payload.creds;
        state.timeTable = {};
    }

    if (action.type === actionTypes.FETCH_EVENT_SUCCESS) {
        state.unreadEvents = action.payload.creds;
    }

    if (action.type === actionTypes.FETCH_ATTENDANCE_FAILURE) {
        state.attendanceErr = action.payload.creds;
        state.attendance = [];
    }

}, initialState);