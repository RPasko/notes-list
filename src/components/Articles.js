import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import { Field, reduxForm, reset } from 'redux-form';
import { bindActionCreators } from 'redux';
import {
    getPosts,
getUsers
} from '../actions/index';

class Articles extends Component{
    state = {
        itemsArr: [],
        activeItem: null,
        comments: [],
        error_text: null
    };
    componentWillMount(){

        this.props.getPosts();
        this.props.getUsers();


        if (localStorage.data && localStorage.data.length>0) {
            let temp = JSON.parse(localStorage.data)
            this.setState({
                itemsArr: temp,
                activeItem: temp[0].id,
                comments: temp[0].comments
            })
        }
        document.addEventListener('keydown', (event) => {
            this.keydownHandler(event)
        });
    }
    componentWillUnmount(){document.removeEventListener('keydown', (event) => {
        this.keydownHandler(event)
    });}
    keydownHandler=(e)=>{
        if(e.keyCode===13 && e.ctrlKey) {
            const { itemsArr, activeItem } = this.state;
            let value = document.getElementById('jsTextarea').value;
            if (value.length>5) {
                this.setState({
                            error_text: null
                        });
                itemsArr.map(item => {
                    if(item.id == activeItem){
                        item['comments'].push(value);
                        this.setState({
                            comments: item['comments']
                        });
                    }
                });
                if (localStorage.data) {
                    localStorage.setItem("data", JSON.stringify(itemsArr));
                }
                this.setState({
                    itemsArr: itemsArr
                });
                document.getElementById('jsTextarea').value = "";
            } else {
                this.setState({
                            error_text: "Required"
                        });
            }

        }
    };




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
                                            <p >
                                                {item.title}
                                            </p>
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

