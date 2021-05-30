import React from 'react';
import {inject,observer} from 'mobx-react';

/**
 * 测试
 */
// const content = '你'
// const  reg = new RegExp(`${content}`).test('你好');
// console.log(reg);

const Todolist = ({todos}) => {

    const {addTodo,deleteTodo,searchTodo,completeTodo} = todos;

    // console.log(addTodo);
    const change = (event) => {
        if(event.target.value.trim() && event.keyCode === 13) {
            addTodo(event.target.value);
            // console.log('a');
            event.target.value = ''
        }
    }

    return (
        <div>
            <div>
                <h1>todoApp demo</h1>
                <div style={{marginBottom:'10px'}}>
                    <label  htmlFor='todo'>新建事项:</label>
                    <input type='text' id='todo' onKeyUp={(e) => change(e)}/>
                    &nbsp;
                    <label htmlFor='searchTodo'>查找相应代办事项:</label>
                    <input type='text' id='searchTodo' onChange={(e) => {searchTodo(e.target.value)}} onBlur={(e)=> {e.target.value = '';todos.searchWord = ''}}/>
                </div>
                <div>
                    Completed:{todos.completed}
                    &nbsp;&nbsp;
                    Uncompleted:{todos.uncompleted}
                </div>
                <div>
                    <ul>
                        {todos.sdo.length ? (!todos.searchWord ? todos.todos.map(todo => (
                            <li key={todo.id}>
                                {todo.complete ? '[✔︎]':'[✖︎]'}
                                {todo.content}
                                &nbsp;&nbsp;&nbsp;
                                <button onClick={() => {deleteTodo(todo.id)}}>
                                    删除这个事项
                                </button>
                                &nbsp;
                                {!todo.complete&&<button onClick={() => {completeTodo(todo.id)}}>
                                    完成
                                </button>}
                            </li>
                        )) : todos.sdo.map(sdo => (
                            <li key={sdo.id}>
                                {sdo.complete ? '[✔︎]':'[✖︎]'}
                                {sdo.content}
                                &nbsp;&nbsp;&nbsp;
                                <button onClick={() => {deleteTodo(sdo.id)}}>
                                    删除这个事项
                                </button>
                                &nbsp;
                                {!sdo.complete&&<button onClick={() => {completeTodo(sdo.id)}}>
                                    完成
                                </button>}
                            </li>
                        ))):(todos.searchWord ? <h1>没有找到你想要的事项</h1> : todos.todos.map(todo => (
                            <li key={todo.id}>
                                {todo.complete ? '[✔︎]':'[✖︎]'}
                                {todo.content}
                                &nbsp;&nbsp;&nbsp;
                                <button onClick={() => {deleteTodo(todo.id)}}>
                                    删除这个事项
                                </button>
                                &nbsp;
                                {!todo.complete && <button onClick={() => {completeTodo(todo.id)}}>
                                    完成
                                </button>}
                            </li>
                        )))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default inject('todos')(observer(Todolist));
