import {ADD_TODO,CHANGE_TODO_STATUS,DELETE_TODO} from '../constant';

export const addTodo = (data) => ({type:ADD_TODO,data});
export const changeTodoStatus = (data) => ({type:CHANGE_TODO_STATUS,data});
export const deleteTodos = (data) => ({type:DELETE_TODO,data});

