import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import App from './components/app';
import MainPage from './containers/main_page';
import NoMatch from './components/noMatch';

export default (
    <App>
        <div>
            <Switch>
                 <Route path='/' exact render={() => <Redirect to="/dashboard" push />}/>
                <Route path='/dashboard' component={MainPage} />
                <Route component={NoMatch}/>
            </Switch>
        </div>
    </App>
)


