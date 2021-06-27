import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {addTodo,changeTodoStatus,deleteTodos} from '../../redux/action/todo';
import {nanoid} from 'nanoid';

const TodoList = () => {
    //hooks
    const todos = useSelector(state => state.todos);

    const count = useSelector(state => state.count);

    const dispatch = useDispatch();

    const underControl = (e) => {
        if(e.keyCode === 13 && e.target.value){
            //分发请求
            //分发action
            dispatch(addTodo(e.target.value));
            e.target.value = '';
        }
    }

    let complete = todos.filter(todo => todo.complete).length;

    let unComplete = todos.filter(todo => !todo.complete).length;

    return (
        <div>
            <div>
                <p>上方组件求和的值:{count}</p>
            </div>
            <label htmlFor='addTodo'>添加todo:</label>
            <input type='text' id='addTodo' onKeyUp={(e) => {underControl(e)}}/>
            <div>
                <p>已完成:{complete},未完成:{unComplete}</p>
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id}>
                            {todo.complete ? '[✅]':'[❎]'}
                            {todo.content}
                            &nbsp;
                            {!todo.complete && <button key={nanoid()} onClick={()=>{dispatch(changeTodoStatus(todo.id))}}>
                                已完成
                            </button>}
                            &nbsp;
                            <button key={nanoid()} onClick={()=>{dispatch(deleteTodos(todo.id))}}>
                                删除这个事项
                            </button>
                            &nbsp;
                            {todo.complete && <button key={nanoid()} onClick={()=>{dispatch(changeTodoStatus(todo.id))}}>
                                撤销
                            </button>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;
