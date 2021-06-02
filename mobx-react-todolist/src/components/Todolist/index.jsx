import React from 'react';
import {inject,observer} from 'mobx-react';
import {useHistory} from 'react-router-dom'
import './index.css';
import {NavLink,Route} from 'react-router-dom';
import Completed from "./Completed";
import UnCompleted from "./UnCompleted";

/**
 * 测试
 */
// const content = '你'
// const  reg = new RegExp(`${content}`).test('你好');
// console.log(reg);

const Todolist = ({todos}) => {

    const {addTodo,searchTodo,setSdo,setSearchWord} = todos;
    const history = useHistory();
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
                <NavLink to='/complete' className='link' activeClassName='ac'>已完成的事项</NavLink>
                <NavLink to='/uncomplete' className='link' activeClassName='ac'>未完成的事项</NavLink>
                <Route path={'/complete'}>
                  <Completed todos={todos}/>
                 </Route>
                <Route path={'/unComplete'}>
                    <UnCompleted todos={todos}/>
                </Route>
                <div style={{marginBottom:'10px'}}>
                    <label  htmlFor='todo'>新建事项:</label>
                    <input type='text' id='todo'  onFocus={() => {setSdo();setSearchWord(''); history.push('/');}} onKeyUp={(e) => {
                        change(e);
                    }} onBlur={(e)=>{e.target.value = ''}}/>
                    &nbsp;
                    <label htmlFor='searchTodo'>查找相应代办事项:</label>
                    <input type='text' id='searchTodo' onChange={(e) => {
                        searchTodo(e.target.value);
                    }} onBlur={(e)=> {e.target.value = '';
                        setTimeout(()=>{
                            setSdo();
                            setSearchWord('');
                        },100);
                    }}
                       onFocus={() => {history.push("/")}}/>
                </div>
                <div>
                    Completed:{todos.completed}
                    &nbsp;&nbsp;
                    Uncompleted:{todos.uncompleted}
                </div>
                <div>
                            {todos.sdo.length ? (!todos.searchWord ? <F con={todos.todos} t={todos}/> : <F con={todos.sdo} t={todos}/>)
                                :
                            (todos.searchWord ? <h3>没有找到你想要的事项</h3> : <F con={todos.todos} t={todos}/>)}
                </div>
            </div>
        </div>
    );
};

export const F = (props) => {
    let {con,t} = props;
    const {deleteTodo,completeTodo} = t;
    return (
        <ul>
            {con.map(con => (
                <li key={con.id}>
                    {con.complete ? '[✔︎]':'[✖︎]'}
                    {con.content}
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={() => {deleteTodo(con.id)}}>
                        删除这个事项
                    </button>
                    &nbsp;
                    {!con.complete && <button onClick={() => {completeTodo(con.id)}}>
                        完成
                    </button>}
                </li>
            ))}
        </ul>
    )
}

export default inject('todos')(observer(Todolist));
