import React, { Component, PropTypes } from 'react';
import Router from 'react-router-dom/BrowserRouter';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import { RouteTransition } from 'react-router-transition';
import { AnimatedSwitch } from 'react-router-transition';

import {} from '../actions/index';


class App extends Component {

    componentWillMount(){

    }
    componentDidMount(){

    }
    componentDidUpdate(){

    }
    componentWillReceiveProps() {

    }
    render() {
        return (
            <Router>
                <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                >
                    {this.props.children}
                </AnimatedSwitch>
            </Router>
        );
    }
}



export default App;