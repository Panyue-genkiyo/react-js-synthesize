//主要角色
import {createStore,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import allReducer from './index';

export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))
