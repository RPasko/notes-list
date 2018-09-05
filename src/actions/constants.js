export let ROOT_URL;

if(window.location.host == 'localhost:8080'){
    ROOT_URL = 'https://jsonplaceholder.typicode.com'
}else{
    ROOT_URL = 'https://jsonplaceholder.typicode.com';
}

export const GET_POSTS         = 'GET_POSTS';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAIL    = 'GET_POSTS_FAIL'

export const GET_USERS         = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAIL    = 'GET_USERS_FAIL'
