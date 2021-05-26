import {createSlice} from "@reduxjs/toolkit";

const middleware = [];

const personSlice = createSlice({
    name:'person',
    initialState:{
        persons:[
            {id:'01',name:'你好'},
            {id:'02',name:'不好'},
        ]
    },
    reducers:{
        addPerson:(state,action) => {
            state.person.push(action.payload);
        }
    }
});


export const {addPerson} = personSlice.actions;
export default personSlice.reducer;

