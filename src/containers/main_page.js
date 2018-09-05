import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import RenderField from '../components/RenderField/RenderField';
import { required, minLength } from '../helpers/validation';
import {getPosts} from '../actions/index';

class MainPage extends Component{
    state = {
        itemsArr: [],
        activeItem: null,
        comments: [],
        error_text: null
    };
    componentWillMount(){
        this.props.getPosts().then((res)=>{
            if(res.payload && res.payload.status && res.payload.status == 200 || res.payload.status == 201){
                comments: res.payload.data
                console.log(res.payload.data);
            }
        });

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
    SubmitForm=(data)=>{
        let arr =  new Array();
        let obj =  new Object();

        if (localStorage.data) {
            let newArr = JSON.parse(localStorage.data);
            obj.id = newArr[newArr.length-1]['id'] + 1;
            obj.name = data.name;
            obj.comments = [];
            newArr.push(obj);
            localStorage.setItem("data", JSON.stringify(newArr));
            this.setState({
                itemsArr: JSON.parse(localStorage.data)
            })
        } else {
            obj.id = 1;
            obj.name = data.name;
            obj.comments = [];
            arr.push(obj);
            localStorage.setItem("data", JSON.stringify(arr));
            this.setState({
                itemsArr: JSON.parse(localStorage.data),
                activeItem: 1
            })
        }
    };
    handleDelete = (id) => {
        const { itemsArr, activeItem } = this.state;
        console.log(id, activeItem);

        itemsArr.map((e, i)=>{
            if (id == e.id) {
                itemsArr.splice(i, 1);
                if (itemsArr.length>0 && activeItem == id) {
                    this.setState({
                        activeItem: itemsArr[0].id,
                        comments: itemsArr[0].comments
                    })
                }
            }
        });
        let newArr = itemsArr;

        if (itemsArr.length>0) {
            localStorage.setItem("data", JSON.stringify(newArr));
        } else {
            localStorage.removeItem("data");
            this.setState({
                activeItem: null,
                comments: []
            })
        }

        this.setState({
            itemsArr: newArr
        })
    };
    handleActive = (id) => {
        const { itemsArr } = this.state;
        itemsArr.map(item => {
            if(item.id == id){
                this.setState({
                    comments: item.comments
                })
            }
        });
        this.setState({
            activeItem: id
        })
    };

    render(){
        const { handleSubmit, submitting } = this.props;
        const { itemsArr, activeItem, comments, error_text } = this.state;
        return(
            <div className="main-wrapper">
                <div className="header">
                    <h1>Blog app</h1>
                </div>
                <div className="content-wrapper">
                    <div>
                        <h1>Articles</h1>


                        

                        <form  onSubmit={handleSubmit((data)=>{this.SubmitForm(data)})}>
                            <div className="form-adding-items">
                                <div>
                                    <Field name="name" type="text" validate={[required, minLength(3)]} component={RenderField} placeholder="Type name here..." autoComplete='off'/>
                                </div>
                                <div>
                                    <button type="submit" className="btn">Add new</button>
                                </div>
                            </div>
                        </form>
                        <div className="item-wrapper">
                            {itemsArr.map(item => {
                                return (
                                    <div className="item-name" key={item.id}>
                                        <div>
                                            <p className={activeItem == item.id ? "active-item" : ""} onClick={()=>{this.handleActive(item.id)}}>
                                                {item.name}
                                                {item.comments.length>0 ? <span>{item.comments.length}</span>: ""}
                                            </p>
                                        </div>
                                        <div><button className="btn btn-red" onClick={()=>{this.handleDelete(item.id)}}>Delete</button></div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                    <div>
                        <h1>Comments</h1>
                        <div className="comments-wrapper">
                            {comments.map((i, e) => {
                                return (
                                    <div key={"comment" + e} className="comment-item">
                                        <div>
                                            <span className={e%2 ? "random-color random-color-violet": "random-color"} ></span>
                                        </div>
                                        <div>{i}</div>
                                    </div>
                                )
                            })
                            }
                            <div className="comment-item">
                                <div>
                                    <span className="random-color" ></span>
                                </div>
                                <div className={error_text == null ? "textarea-wrapper" : "textarea-wrapper error_border" } >
                                    <textarea disabled={itemsArr.length>0 ? false : true} name="" id="jsTextarea"  rows="5" />
                                    <span>{error_text !== null ? error_text : '' }</span>
                                </div>
                            </div>
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
        
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

