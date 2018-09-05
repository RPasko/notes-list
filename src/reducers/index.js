import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
    form: formReducer,
    main: PostsReducer
});

export default rootReducer;
