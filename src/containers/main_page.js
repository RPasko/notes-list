import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import { Field, reduxForm, reset } from 'redux-form';
import { bindActionCreators } from 'redux';
import Articles from '../components/Articles';
import Article from '../components/Article';

class MainPage extends Component{

    constructor(props) {
        super(props);
        const { match } = this.props;
        this.baseUrl = match.url[match.url.length - 1] == '/' ? match.url : match.url + '/';
        this.state = {};
    }

    render(){
        const { match } = this.props;
        return(
            <div className="main-wrapper">
                <Switch>
                    <Route
                        path={ this.baseUrl }
                        exact
                        component={Articles}
                    />
                    <Route path={`${match.url}/article/:id`} component={Article}/>
                </Switch>
            </div>
        );

    }
}




function  mapStateToProps(state) {
    return{
        main: state.main,
    }
}

export default connect(mapStateToProps, {})(MainPage);

