import React from 'react';
import {inject,observer} from 'mobx-react';
import {useHistory} from 'react-router-dom'
import {NavLink,Route} from 'react-router-dom';
import './index.css';

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
                    <CompletedOrUnCompleted todos={todos} completed={true}/>
                 </Route>
                <Route path={'/unComplete'}>
                    <CompletedOrUnCompleted todos={todos} completed={false}/>
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
                    已完成:{todos.completed}
                    &nbsp;&nbsp;
                    未完成:{todos.uncompleted}
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

const F = (props) => {
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


//封装
const CompletedOrUnCompleted = ({todos,completed}) => {
    let completeTodos = todos.todos.filter(todo => todo.complete === completed);
    return (
           (todos.todos.length === 0 ? <h3>没有代办事项，赶紧去添加一条吧</h3>:(completeTodos.length !== 0 ?
                    <div>
                      <F con={completeTodos} t={todos}/>
                    </div>:
                    (completed ? <div>
                                   <h3>加油哦～您的待办事项一件也还没完成</h3>
                                 </div> :
                                 <div>
                                   <h3>真棒！您的待办事项都已完成了！！</h3>
                                 </div>
                    )
               )
           )
    );
}

export default inject('todos')(observer(Todolist));
