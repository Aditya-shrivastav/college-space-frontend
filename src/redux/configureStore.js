import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './rootReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['login', 'user', 'faculty', 'student']
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const configureStore = () => {
    const store = createStore(
        persistedReducer,
        compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    )

    const persistor = persistStore(store)

    return { store, persistor };
}