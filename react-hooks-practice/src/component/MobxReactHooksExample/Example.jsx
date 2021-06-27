import React from 'react';
import {observer,useLocalObservable} from 'mobx-react';
import TodoView from "./TodoView";
import Footer from "./Footer";
import Example2 from "./Example2";

const Example = observer(() => {

    const store = useLocalObservable(() => ({
       todos:[
           {id:1,text:'Buy eggs',complete:true},
           {id:2,text:'write a post',complete:false}
       ],
        toggleTodo(id){
           store.todos[id].complete = !store.todos[id].complete;
        },
        get remainingTodos(){
           return store.todos.filter(todo => !todo.complete).length;
        }
    }));

    return (
        <div>
            <h1>Todo</h1>
            <TodoView todos={store.todos} toggleTodo={store.toggleTodo}/>
            <Footer remaining={store.remainingTodos} total={store.todos.length}/>
            {/*<Example2/>*/}
        </div>
    );
});

export default Example;
