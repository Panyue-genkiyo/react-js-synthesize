//合并reducer
import {combineReducers} from 'redux';

import {countReducer} from './reducer/count';
import {todoListReducer} from './reducer/todo'

export default combineReducers({
    count:countReducer,
    todos:todoListReducer
});
