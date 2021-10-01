import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import movieReducer from 'containers/client/Home/module/reducers';
import movieDetailReducer from 'containers/client/MovieDetail/module/reducers';
import authReducer from 'containers/shared/Authentication/module/reducer';
import userReducer from 'containers/admin/User/module/reducer';
import thunk from 'redux-thunk';
// Control login & logout with a library
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// Control login & logout with a library ends

const rootReducer = combineReducers({
    movieReducer,
    movieDetailReducer,
    authReducer,
    userReducer,
});

// config redux-persist library
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authReducer'] // to store at local storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
// config redux-persist library ends

const store = createStore(
    // rootReducer,
    persistedReducer, // after combination with redux-persist
    composeWithDevTools(applyMiddleware(thunk))
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// config redux-persist library
const persistor = persistStore(store);

export { store, persistor };