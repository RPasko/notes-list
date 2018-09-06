import * as types from './constants';
import * as BASE_URL from '../config';
import axios from "axios";

export function getPosts(props) {
    const request = axios.get(`${BASE_URL.API_BASE_URL}/posts/`, props)
        .then((response)=>{
            return response
        })
        .catch((err)=>{
            let result = {
                error: err.response.data
            };
            return result
        });

    return{
        type: types.GET_POSTS,
        payload: request
    }
}

export function getUsers(props) {
    const request = axios.get(`${BASE_URL.API_BASE_URL}/users/`, props)
        .then((response)=>{
            return response
        })
        .catch((err)=>{
            let result = {
                error: err.response.data
            };
            return result
        });

    return{
        type: types.GET_USERS,
        payload: request
    }
}
