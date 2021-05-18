/**
 * 汇总所有reducer
 */

//引入countReducer
import countReducer from './reducers/count';
//引入personReducer
import {personReducer} from './reducers/person';
import {combineReducers} from 'redux';


//合并reducer
//调用combineReducers时所传入的对象就是redux帮我们保存的总状态对象
export default combineReducers({
    count:countReducer,
    persons:personReducer
});



