require('es6-promise').polyfill();
import axios from 'axios';
import * as constants from './constant';


// export function signIn(props) {
//     let config = {
//         headers: {'Accept-Language': localStorage.getItem('language_code')}
//     };
//     const request = axios.post(`${constants.ROOT_URL}/v0/auth/login/`, props, config)
//         .then((response)=>{
//             return response
//         })
//         .catch((err)=>{
//             let result = {
//                 error_signIn: err.response.data
//             };
//             return result
//         });
//
//     return{
//         type: constants.SIGN_IN,
//         payload: request
//     }
// }
