import { loginReducer } from './loginReducer';
import { signupReducer } from './signupReducer';
import { userReducer } from './userReducer';
import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';
import { studentReducer } from './studentReducer';
import { facultyReducer } from './facultyReducer';

const appReducer = combineReducers({ login: loginReducer, signup: signupReducer, user: userReducer, student: studentReducer, faculty: facultyReducer })


export const rootReducer = (state, action) => {

    if (action.type === actionTypes.LOGOUT_SUCCESS) {
        localStorage.clear()
        return appReducer(undefined, action);
    }

    return appReducer(state, action)
}