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
    getPost,
    getUsers,
    getUser,
    getComments
} from '../actions/index';

class Article extends Component{
    state = { };
    componentWillMount(){
        let pathname_arr = window.location.pathname.split('/');
        let id = pathname_arr[pathname_arr.length - 1];
        this.props.getPost(id).then((res)=>{
            if(res.payload && res.payload.status && res.payload.status == 200 ){
               this.props.getUser(res.payload.data.userId);
            }
        });
        
        this.props.getComments(id);
        if (!this.props.main.users.length) this.props.getUsers();
    }

    render(){
        const { main: {comments, user, } } = this.props;
        const { } = this.state;
        return(

            <div className="main-wrapper">
                <div className="header">
                    <h1>Blog app</h1>
                </div>
                <div className="content-wrapper">
                    <div>
                         <Link to={`/dashboard`} > Назад </Link>
                        <div className="item-wrapper">
                            <h1>{user.name}</h1>
                            {comments && comments.length>0 ? comments.map((item, i) => {
                                    return (
                                        <div key={i}>
                                            <h6> Comment #{i}</h6>
                                            <p >{item.body}</p>
                                        </div>
                                    )
                                }) :
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
        getPost,
        getUsers,
        getUser,
        getComments
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);

