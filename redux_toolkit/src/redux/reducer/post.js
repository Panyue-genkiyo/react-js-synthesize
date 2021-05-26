import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const fetchPost = createAsyncThunk(
    'posts/fetchPostsStatus',
    async (url, thunkAPI) => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        return await response.json();
    }
);

const postSlice = createSlice({
    name:'post',
    initialState:{
        posts:[],
    },
    reducers:{

    },
    extraReducers:{
       [fetchPost.fulfilled]:(state,action) => {
           state.posts = [...action.payload];
       }
    }
});


export default postSlice.reducer;

