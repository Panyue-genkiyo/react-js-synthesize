//该文件暴露store对象，整个应用只有一个store对象
//applyMiddleware执行中间件
import {createStore,applyMiddleware} from 'redux';
//引入redux-thunk,用于支持异步action
import thunk from 'redux-thunk';
//引入redux扩展程序
import {composeWithDevTools} from 'redux-devtools-extension'

import allReducer from './index';


//默认暴露store
export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)));

