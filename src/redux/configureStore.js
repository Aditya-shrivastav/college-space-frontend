import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loginReducer } from './loginReducer';
import { signupReducer } from './signupReducer';
import { userReducer } from './userReducer';

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            login: loginReducer,
            signup: signupReducer,
            user: userReducer
        }),
        compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    )

    return store;
}