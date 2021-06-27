import {ADD_TODO,CHANGE_TODO_STATUS,DELETE_TODO} from '../constant';

let todoList = [];

export const todoListReducer = (preState = todoList,action) => {

    const {type,data} = action;

    switch (type){

        case ADD_TODO:
           return todoList = [...preState,{
               id:new Date(),
               content:data,
               complete:false
            }];

        case CHANGE_TODO_STATUS:
            let todo1 = preState.find(todo => todo.id === data);
            todo1.complete = !todo1.complete;
            return [...preState];

        case DELETE_TODO:
            let todos = preState.filter(todo => todo.id !== data);
            return [...todos];

        default:
            return preState;
    }
}


