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
        <div className={'px-3 py-5'}>
            <div>
                <h1 className='px-3 text-2xl mb-3'>todoApp demo</h1>
                <NavLink to='/complete' className='link' activeClassName='ac'>已完成的事项</NavLink>
                <NavLink to='/uncomplete' className='link' activeClassName='ac'>未完成的事项</NavLink>
                <Route path={'/complete'}>
                    <CompletedOrUnCompleted todos={todos} completed={true}/>
                 </Route>
                <Route path={'/unComplete'}>
                    <CompletedOrUnCompleted todos={todos} completed={false}/>
                </Route>
                <div className='mb-3 flex space-x-4'>
                    <div>
                        <label htmlFor='todo'>新建事项:</label>
                        <input type='text' id='todo' className={'border-2'}  onFocus={() => {setSdo();setSearchWord(''); history.push('/');}} onKeyUp={(e) => {
                            change(e);
                        }} onBlur={(e)=>{e.target.value = ''}}/>
                    </div>
                    <div>
                        <label htmlFor='searchTodo'>查找相应的待办事项:</label>
                        <input className={'border-2'} type='text' id='searchTodo' onChange={(e) => {
                            searchTodo(e.target.value);
                        }} onBlur={(e)=> {e.target.value = '';
                            setTimeout(()=>{
                                setSdo();
                                setSearchWord('');
                            },100);
                        }}
                               onFocus={() => {history.push("/")}}/>
                    </div>
                </div>
                {todos.todos.length !== 0 ? <div className={'space-x-4 mb-3'}>
                    <span>已完成:{todos.completed}</span>
                    <span>未完成:{todos.uncompleted}</span>
                </div>:<div> </div>}
                <div className={'border-2 px-4 py-6 space-y-3'}>
                    {todos.todos.length === 0 ? <h3>没有代办事项，赶紧去添加一条吧</h3> : <h3>您的待办事项</h3>}
                            {todos.sdo.length ? (!todos.searchWord ? <F con={todos.todos} t={todos}/> : <F con={todos.sdo} t={todos}/>)
                                :
                            (todos.searchWord ? (todos.todos.length !== 0 ? <h3>没有找到你想要的事项</h3> : <div> </div>) : <F con={todos.todos} t={todos}/>)}
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
                    <button className='px-3 py-2 text-gray-800 bg-red-500 hover:shadow-sm  hover:bg-red-400 hover:text-white mr-2 rounded' onClick={() => {deleteTodo(con.id)}}>
                        删除这个事项
                    </button>
                    {!con.complete && <button className='px-3 py-2 text-gray-800 bg-green-500 hover:shadow-sm  hover:bg-green-400 hover:text-white rounded' onClick={() => {completeTodo(con.id)}}>
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
        <div className='mb-3 px-4 py-6 border-2 border-dotted  space-y-3'>
            {todos.todos.length === 0 ? <h3>No todo</h3> : (completeTodos.length !== 0 ?
                    <div>
                        <F con={completeTodos} t={todos}/>
                    </div> :
                    (completed ? <div>
                                <h3>加油哦～您的待办事项一件也还没完成</h3>
                            </div> :
                            <div>
                                <h3>真棒！您的待办事项都已完成了！！</h3>
                            </div>
                    )
                 )
            }
        </div>
    );
}

export default inject('todos')(observer(Todolist));
