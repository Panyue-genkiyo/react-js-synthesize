import React, {Component} from 'react';
import ProtoTypes from 'prop-types';
import Item from "../Item";
import './index.css'


export default class List extends Component {

    //对接受的参数进行参数限制
    static propTypes = {
        todos: ProtoTypes.array.isRequired,
        updateTodo: ProtoTypes.func.isRequired,
        deleteTodo: ProtoTypes.func.isRequired
    }


    render() {
        //注意这个updateTodo并不是list组件使用，而是item组件使用
        const {todos,updateTodo,deleteTodo} = this.props;
        return (
            <ul className="todo-main">
                {
                    todos.map((todo)=>{
                        return <Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
                    })
                }
            </ul>
        );
    }
}
