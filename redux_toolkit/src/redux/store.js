// import {configureStore, createAction, createAsyncThunk, createSlice, getDefaultMiddleware} from '@reduxjs/toolkit';
//
// //中间件
// const middleWare = [
//     getDefaultMiddleware(),
// ];
//
// const countState = {
//     count : 0,
// }
//
// // //count + action
// // const increment = createAction('INCREMENT');
// // const asyncIncrement = createAction('INCREMENT');
// //
// //
// // //count reducer
// //
// // const countReducer  = (countState, {
// //     [increment]: (state,action) => {
// //         state.count += action.payload;
// //     },
// // });
//
// //createSlice
// const countSlice = createSlice({
//     name:'count',
//     initialState:countState,
//     reducers:{
//         [increment]: (state,action) => {
//             state.count += action.payload;
//         },
//     }
// })
//
// const asyncIncrement = createAsyncThunk(
//     "count/asyncIncrement",
//     (arg) => {
//         return () => {
//             setTimeout(() =>{
//                 store.dispatch("/count/increment");
//             },2000);
//         }
//     }
// );
//
// const {increment} = createSlice.actions;
//
// const countReducer = countSlice.reducer;
//
// export const store = configureStore({
//     reducer:{
//         count: countReducer,
//     },
//     middleWare
// });

import {configureStore} from '@reduxjs/toolkit';
import countReducer from './reducer/count';
import personReducer from './reducer/person'
import postReducer from './reducer/post';

export default configureStore({
  reducer:{
    count:countReducer,
    person:personReducer,
    post:postReducer,
  }});



