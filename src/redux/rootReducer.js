import { loginReducer } from './loginReducer';
import { signupReducer } from './signupReducer';
import { userReducer } from './userReducer';
import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

const appReducer = combineReducers({ login: loginReducer, signup: signupReducer, user: userReducer })


export const rootReducer = (state, action) => {

    if (action.type === actionTypes.LOGOUT_SUCCESS) {
        localStorage.clear()
        return appReducer(undefined, action);
    }

    return appReducer(state, action)
}