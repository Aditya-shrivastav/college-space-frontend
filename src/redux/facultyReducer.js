import produce from 'immer';
import * as actionTypes from './actionTypes';

let initialState = {
    courses: []
}

export const facultyReducer = produce((state = initialState, action) => {

    if (action.type === actionTypes.FETCH_FACULTY_COURSE_SUCCESS) {
        console.log(action.payload)
        state.courses = action.payload.creds;
    }

}, initialState);