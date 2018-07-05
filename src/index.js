import React from 'react';
import ReactDOM from 'react-dom';

//Redux
import {Provider} from 'react-redux' ;
import {createStore, applyMiddleware, compose} from 'redux' ;
import thunkMiddleware from 'redux-thunk' ;
import jwtDecode from 'jwt-decode' ;
import {setCurrentUser} from "./actions/authActions";
import rootReducer from './reducers' ;

import App from './components/App';
import setAuthHeader from "./utils/setAuthHeader";

//Added redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);

if (localStorage.token) {
    setAuthHeader(localStorage.token);
    store.dispatch(setCurrentUser(jwtDecode(localStorage.token)));
}


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>

    , document.getElementById('root'));
