import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, browserHistory} from 'react-router';
import promise from 'redux-promise';

import routes from './routes';
import reducers from './reducers/index';

import '../assets/style.css';

const createStoreWithMiddleware = applyMiddleware( promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers, {} , window.devToolsExtension ? window.devToolsExtension() : f => f)}>
        {routes}
    </Provider>
    , document.querySelector('.wrapper'));
