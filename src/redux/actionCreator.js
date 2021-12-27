import axios from 'axios';
import dotenv from 'dotenv';
import { baseUrl } from '../shared/constants';
import * as actionTypes from './actionTypes';
dotenv.config();

export const loginError = (err) => {
    return {
        type: actionTypes.LOGIN_FAILED,
        payload: {
            err
        }
    }
}

export const loginSuccess = (response) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
            response
        }
    }
}

export const loginUser = (creds) => (dispatch) => {

    return axios(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "http://localhost:5000"
        },
        data: JSON.stringify(creds)
    }).then((response) => {

        if (response.status === 200) {
            return response.data;
        }
        else {
            var err = new Error('Error ' + response.data.status + ': ' + response.data.message)
            err.response = response;
            throw err;
        }
    }).then((response) => {

        if (response.token) {
            localStorage.setItem('token', response.token)
            localStorage.setItem('userId', response.userId)
            dispatch(loginSuccess(response))

        } else {
            var err = new Error('Error ' + response.status + ': ' + response.statusText)
            err.response = response;
            throw err;
        }
        return response;
    }).catch((err) => {
        dispatch(loginError(err?.response?.data.message))
        return { success: false, err: err?.response?.data?.message }
    })
}

export const signupSuccess = () => {
    return {
        type: actionTypes.SIGNUP_SUCCESS
    }
}

export const signupError = (err) => {
    return {
        type: actionTypes.SIGNUP_FAILURE,
        payload: {
            err
        }
    }
}

export const signupUser = (creds) => (dispatch) => {
    return axios('http://localhost:5000/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(creds)
    }).then((response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            var err = new Error('Error ' + response.status + ': ' + response.statusText)
            err.response = response;
            throw err;
        }
    }).then((response) => {
        if (response.success) {

            dispatch(signupSuccess());
            return response;

        } else {
            var err = new Error('Error ' + response.status + ': ' + response.statusText)
            err.response = response;
            throw err;
        }
    }).catch((err) => {
        dispatch(signupError(err?.response?.data?.message))
        return { success: false, err: err?.response?.data?.message }
    })
}

export const getUserSuccess = (creds) => {
    return {
        type: actionTypes.GET_USER_SUCCESS,
        payload: {
            creds
        }
    }
}

export const getUserFailed = (err) => {
    return {
        type: actionTypes.GET_USER_FAILURE,
        payload: {
            err
        }
    }
}

export const getUser = () => (dispatch) => {

    let token = localStorage.getItem('token');

    return axios(`${baseUrl}/users/getUser`, {
        method: 'GET',
        headers: {
            'x-auth-token': token
        }
    }).then((response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            var err = new Error('Error ' + response.status + ': ' + response.statusText);
            err.response = response;
            throw err;
        }
    }).then((response) => {
        if (response.success) {
            localStorage.setItem('user', response.user.userType);
            dispatch(getUserSuccess(response.user));
            return response;
        } else {
            var err = new Error('Error ' + response.status + ': ' + response.statusText);
            err.response = response;
            throw err;
        }
    }).catch((err) => {
        dispatch(getUserFailed({ err: err?.response?.data?.message }))
        return { success: false, err: err?.response?.data?.message }
    })
}

export const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS
    }
}

export const logoutReducer = () => (dispatch) => {
    localStorage.clear();
    dispatch(logoutSuccess())
}


export const fetchAttendaceSuccess = (creds) => {
    return {
        type: actionTypes.FETCH_ATTENDANCE_SUCCESS,
        payload: {
            creds
        }
    }
}


export const fetchAttendace = () => (dispatch) => {

    return axios(`${baseUrl}/students/getAttendance`, {
        method: 'GET',
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    }).then((resp) => {
        console.log(resp.data.attendance)
        dispatch(fetchAttendaceSuccess(resp.data.attendance))
    })
}

export const fetchCoursesOfFacultySuccess = (creds) => {
    return {
        type: actionTypes.FETCH_FACULTY_COURSE_SUCCESS,
        payload: {
            creds
        }
    }
}

export const fetchCoursesOfFaculty = () => (dispatch) => {
    return axios(`${baseUrl}/courses/getCourses`, {
        method: 'GET',
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    }).then((resp) => {
        dispatch(fetchCoursesOfFacultySuccess(resp.data.courses))
    })
}

export const fetchStudentCoursesSuccess = (creds) => {
    return {
        type: actionTypes.FETCH_STUDENT_COURSE_SUCCESS,
        payload: {
            creds
        }
    }
}

export const fetchStudentCourses = () => (dispatch) => {
    return axios(`${baseUrl}/courses/getStudentCourses`, {
        method: 'GET',
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    }).then((resp) => {
        dispatch(fetchStudentCoursesSuccess(resp.data.courses))
    })
}

export const fetchStudentTimeTableSuccess = (creds) => {
    return {
        type: actionTypes.FETCH_STUDENT_TIME_TABLE,
        payload: {
            creds
        }
    }
}


export const fetchStudentTimeTable = () => (dispatch) => {
    return axios(`${baseUrl}/students/getTimeTable`, {
        method: 'GET',
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    }).then((resp) => {
        dispatch(fetchStudentTimeTableSuccess(resp.data.timeTable))
    })
}


export const fetchUnreadEventsSuccess = (creds) => {
    return {
        type: actionTypes.FETCH_EVENT_SUCCESS,
        payload: { creds }
    }
}

export const fetchUnreadEvents = () => (dispatch) => {
    return axios(`${baseUrl}/students/checkUnreadEvents`, {
        method: 'GET',
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    }).then((resp) => {
        console.log(resp.data)
        console.log('hey')
        dispatch(fetchUnreadEventsSuccess(resp.data.unreadMessages))
    })
}
