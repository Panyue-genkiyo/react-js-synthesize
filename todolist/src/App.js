import React, {Component} from 'react';
import Header from "./Header";
import List from "./List";
import "./App.css";
import Footer from "./Footer";

class App extends Component {

    //状态放在外壳组件上，方便App组件与子组件相互传递状态
    //注意状态保存在哪个组件里，操作状态的方法就在对应相同的组件中
    //但是这些操作的方法,并不一定是这个组件使用，也有可能是其子组件使用
    state = {
        todos:[
            {id:'001',name:'吃饭',done:true},
            {id:'002',name:'睡觉',done:true},
            {id:'003',name:'打代码',done:false},
            {id:'004',name:'逛街',done:false}
        ]
    }

    addTodo = (todoObj) => {
        //更改状态，添加todo
        const {todos} = this.state;
        const newTodos = [todoObj,...todos];
        //更新状态
        this.setState({todos: newTodos});
    }

    //这个函数用于更新一个todo对象
    //父组件app传递函数给子组件item，方便子组件以后调用以致于修改父组件中的状态，从而达到更新页面的效果
    //把这个回调函数传递给组件item
    updateTodo = (id,done) => {
        const {todos} = this.state;
        // eslint-disable-next-line array-callback-return
        const newTodos = todos.map(todoObj => {
            //匹配数据并加工数据
            if(todoObj.id === id) return {...todoObj,done};
            else return todoObj;
        });
        this.setState({todos: newTodos});
    }

    //删除某个具体id的doto的回调
    deleteTodo = (id) => {
        const {todos} = this.state;
        //删除指定id的todo对象
        const newTodos = todos.filter(todoObj => {
            return todoObj.id !== id;
        });
        this.setState({todos: newTodos});
    }

    //用于处理全选或者全选
    checkAllTodo = (done) => {
        //获取原来的todo
        const {todos} = this.state;
        //
        const newTodos = todos.map((todoObj)=>{
            return {...todoObj,done};
        });//更新状态
        this.setState({todos: newTodos});//更新状态
    }

    //清除已完成任务
    deleteCompletedTodo = () => {
        const {todos} = this.state;
        const newTodos = todos.filter((item) => {
            return !item.done;//每完成的保留下来
        });
        //更新状态
        this.setState({todos:newTodos});
    }


    render() {
        const {todos} = this.state;
        return (
            <div>
                <div className="todo-container">
                    <div className="todo-wrap">
                        <Header addTodo={this.addTodo}/>
                        <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
                        <Footer todos={todos} checkAllTodo={this.checkAllTodo} deleteCompletedTod={this.deleteCompletedTodo}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
