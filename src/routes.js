import React from 'react';
import {Route, IndexRoute, DefaultRoute, Redirect, browserHistory, Router } from 'react-router';

var someAuthCheck = function(nextState, replace) {
    if(localStorage.getItem('id_token') === null && sessionStorage.getItem('id_token') === null){
        if(nextState.location.pathname != '/') {
            replace({
                pathname: '/',
                state: {nextPathname: nextState.location.pathname}
            })
        }
    }
};

export default (
    <Router history={browserHistory} >
        <Route path='/' name="main_page" getComponent={(location, callback) => {
            require.ensure([], function (require) {
                callback(null, require('./components/app.js').default);
            });
        }}>
            <IndexRoute getComponent={(location, callback) => {
                require.ensure([], function (require) {
                    callback(null, require('./containers/main_page.js').default);
                });
            }}/>
        </Route>
        <Route path="*" name="Not_found" getComponent={(location, callback) => {
            require.ensure([], function (require) {
                callback(null, require('./components/noMatch.js').default);
            });
        }}/>
    </Router>
)

