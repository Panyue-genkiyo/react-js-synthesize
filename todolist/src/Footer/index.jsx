import React, {Component} from 'react';
import './index.css';


export default class Footer extends Component {
    render() {
        const {todos} = this.props;//接住todos
        //计算已完成的个数，并计算总数
        const  doneCount = (todos.filter(item => item.done === true)).length;
        const total = todos.length;
        return (
            <div className="todo-footer">
                <label>
                    <input type="checkbox" onChange={this.handleCheckAll} checked={total === doneCount && total !== 0}/>
                </label>
                <span>
          <span>已完成{doneCount}</span> / 全部{total}
        </span>
                <button className="btn btn-danger" onClick={this.handleDeleteCompleteTodos}>清除已完成任务</button>
            </div>
        );
    }

    //全选checkbox的回调
    handleCheckAll = (event) => {
        const {checkAllTodo} = this.props;
        checkAllTodo(event.target.checked);
    }

    //清除已完成的todos
    handleDeleteCompleteTodos = () => {
        const {deleteCompletedTod} = this.props;
        deleteCompletedTod();
    }

}
