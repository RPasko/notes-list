import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, browserHistory} from 'react-router';
import promise from 'redux-promise';
import { ReduxRouter, reduxReactRouter  } from 'redux-router';

import routes from './routes';
import reducers from './reducers';

import '../assets/style.css';

const createStoreWithMiddleware = applyMiddleware( promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers, {} , window.devToolsExtension ? window.devToolsExtension() : f => f)}>
        {routes}
    </Provider>
    , document.querySelector('.wrapper'));
