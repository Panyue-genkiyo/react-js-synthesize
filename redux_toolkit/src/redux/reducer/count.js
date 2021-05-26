import {createSlice} from "@reduxjs/toolkit";
//
// export const initialState = {
//     count:0,
// }

// export const selectCount = (state) => state.counter.count;

export const countSlice = createSlice({
    name:'counter',
    initialState:{
      count:0,
    },
    reducers: {
        increment: (state, action) => {
            state.count += action.payload;
        },
    },
});

//异步加
export const asyncIncrement = (amount) => (dispatch) => {
    setTimeout(()=>{
        dispatch(increment(amount));
    },2000);
}

export const {increment} = countSlice.actions;

export default countSlice.reducer;
