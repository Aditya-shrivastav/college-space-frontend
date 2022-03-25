import produce from 'immer';
import * as actionTypes from './actionTypes';

let initialState = {
    courses: [],
    courseErr: null
}

export const facultyReducer = produce((state = initialState, action) => {

    if (action.type === actionTypes.FETCH_FACULTY_COURSE_SUCCESS) {
        state.courseErr = null
        state.courses = action.payload.creds;
    }

    if (action.type === actionTypes.FETCH_FACULTY_COURSE_FAILED) {
        state.courses = [];
        state.courseErr = action.payload.creds;
    }

}, initialState);