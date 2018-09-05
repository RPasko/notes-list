import * as types from './constants';

//
// export function getPosts(props) {
//
//     const request = axios.get(`${constants.ROOT_URL}/posts/`, props)
//         .then((response)=>{
//             return response
//         })
//         .catch((err)=>{
//             let result = {
//                 error: err.response.data
//             };
//             return result
//         });
//
//     return{
//         type: constants.GET_POSTS,
//         payload: request
//     }
// }


export function getPosts(data) {
    return {
        type: types.GET_POSTS,
        payload: {
            client: 'default',
            request: {
                url: `/posts/`,
                method: "get",
                data
            }
        }
    };
}
export function getUsers(data) {
    return {
        type: types.GET_USERS,
        payload: {
            client: 'default',
            request: {
                url: `/posts/`,
                method: "get",
                data
            }
        }
    };
}