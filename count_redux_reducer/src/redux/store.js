import {createStore,applyMiddleware} from "redux";

import {reducer} from './reducer/count';
import thunk from "redux-thunk";
import {combineReducers} from "redux";

const store = createStore(
    combineReducers({count:reducer}),
    applyMiddleware(thunk)
);

export default store;
