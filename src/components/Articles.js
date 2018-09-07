import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom';
import { Field, reduxForm, reset } from 'redux-form';
import { bindActionCreators } from 'redux';
import {
    getPosts,
    getUsers
} from '../actions/index';

class Articles extends Component{
    state = { };
    componentWillMount(){
        this.props.getPosts();
        this.props.getUsers();
    }

    render(){
        const { main: {users, posts} } = this.props;
        const { } = this.state;

        return(

            <div>
                <div className="header">
                    <h1>Blog app</h1>
                </div>
                <div className="content-wrapper">
                    <div>
                        <h1>Articles</h1>
                        <div className="item-wrapper">
                            {posts && posts.length>0 ? posts.map(item => {
                                    return (
                                        <div className="item-name" key={item.id}>
                                            <Link to={`dashboard/article/${item.id}`} > {item.title} </Link>
                                        </div>
                                    )
                                })
                                :
                                ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function  mapStateToProps(state) {
    return{
        main: state.main
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPosts,
        getUsers
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);

