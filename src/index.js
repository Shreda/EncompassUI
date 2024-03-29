 
import React from 'react';
import ReactDOM from 'react-dom';
// Redux imports
import { Provider } from 'react-redux';
import store from './store/index';

import App from './App';
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';

import { AUTH_TOKEN } from './constants/action-types';

const token = localStorage.getItem(AUTH_TOKEN)
console.log(process.env);
ReactDOM.render(
    <Provider store={store}>
        <CssBaseline/>
        <App token={token}/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();