import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import reducer from '../reducer';
import storage from './redux-persist-taro-storage';

const storageConfig = {
  key: 'app',
  storage:storage,
  blacklist: []
}

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose

const middlewares = [
    thunk,
]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').createLogger())
}

const myPersistReducer = persistReducer(storageConfig, combineReducers({
  ...reducer
}));

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
)

const store = createStore(myPersistReducer, enhancer)

export const persistor = persistStore(store)
export default store;
