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
import filter from 'lodash/filter';
import {
    getPosts,
    getUsers
} from '../actions/index';

class Articles extends Component{
    state = {state_posts: [] };
    componentWillMount(){
        this.props.getPosts().then((res)=>{
            if(res.payload && res.payload.status && res.payload.status == 200 ){
                this.setState({state_posts: res.payload.data});
            }
        });
        this.props.getUsers();
    }

    handler=()=>{
        const { main: {posts} } = this.props;
        const { itemsArr, activeItem } = this.state;
        let value = document.getElementById('jsTextarea').value;
        let filtered_articles = filter(posts, function(item) {
            if (item.title.indexOf(value) != -1 || item.body.indexOf(value) != -1) {
                return item
            }
        });
        this.setState({state_posts: filtered_articles});
    };
    

    render(){
        const { main: {users, posts} } = this.props;
        const {state_posts } = this.state;

        return(
            <div>
                <div className="header">
                    <h1>Blog app</h1>
                    <input type="text" placeholder="Поиск"  id="jsTextarea" className="input-text" />
                    <button onClick={()=>this.handler()} className="btn" > Поиск</button>




                </div>
                <div className="content-wrapper">
                    <div>
                        <h1>Articles</h1>
                        <div className="item-wrapper">
                            {state_posts && state_posts.length>0 ? state_posts.map(item => {
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

