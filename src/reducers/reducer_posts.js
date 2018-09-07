import * as types from "../actions/constants";

const INITIAL_STATE = {posts: [], users: [], comments: [], post: [], user: [] };

export default function (state = INITIAL_STATE, action) {
    switch (action.type){
        case types.GET_POSTS :
            return {...state, posts : action.payload.data};
        case types.GET_POST :
            return {...state, post : action.payload.data};
        case types.GET_USERS:
            return {...state, users: action.payload.data};
        case types.GET_USER:
            return {...state, user: action.payload.data};
        case types.GET_COMMENTS:
            return {...state, comments: action.payload.data};
    }
    return state;
}
