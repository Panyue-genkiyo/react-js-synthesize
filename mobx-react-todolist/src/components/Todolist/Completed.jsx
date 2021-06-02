import React from 'react';
import {inject,observer} from 'mobx-react'
import {F} from './index';

const Completed = ({todos}) => {
    let completeTodos = todos.todos.filter(todo => todo.complete);
    return (
        (todos.todos.length === 0 ? <h3>没有代办事项，赶紧去添加一条吧</h3>:(completeTodos.length !== 0 ? <div>
            <F con={completeTodos} t={todos}/>
        </div>:<div>
            <h3>加油哦～您的待办事项一件也还没完成</h3>
        </div>)
    ));
};


export default inject('todos')(observer(Completed));
