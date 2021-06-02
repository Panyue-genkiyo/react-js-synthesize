import React from 'react';
import {inject,observer} from 'mobx-react'
import {F} from "./index";

const UnCompleted = ({todos}) => {
    let unCompleteTodos = todos.todos.filter(todo => !todo.complete);
    return (
        (todos.todos.length === 0 ? <h3>没有代办事项，赶紧去添加一条吧</h3> : (unCompleteTodos.length === 0 ? <div>
              <h3>真棒！代办事项都已完成了！！</h3>
            </div>:
             <div>
                 <F con={unCompleteTodos} t={todos}/>
            </div>)));
};

export default inject('todos')(observer(UnCompleted));
