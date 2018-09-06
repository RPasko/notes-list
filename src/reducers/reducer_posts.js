import * as types from "../actions/constants";

const INITIAL_STATE = {posts: [], users: [] };

export default function (state = INITIAL_STATE, action) {
    switch (action.type){
        case types.GET_POSTS :
            return {...state, posts : action.payload.data};
        case types.GET_USERS:
            return {...state, users: action.payload.data};
    }
    return state;
}
