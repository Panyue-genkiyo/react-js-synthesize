import {action,observable,computed,makeObservable} from 'mobx';


class TodoState{

    @observable todos = [];
    @observable sdo = [];
    @observable searchWord = '';

    constructor() {
        makeObservable(this);
    }

    @action
    addTodo = (content) => {
        this.todos.push({
            id:Date.now(),
            content,
            complete:false,
        });
    }


    @action
    deleteTodo = (id) => {
        this.todos = this.todos.filter(todo => todo.id !== id);
        // console.log(this.todos);
        // if(this.sdo.length){
        //     this.sdo.length = 0;
        // }
        this.searchWord = '';
    }

    @computed get completed(){
        return this.todos.filter(todo => todo.complete).length;
    }

    @computed get uncompleted(){
        return this.todos.filter(todo => !todo.complete).length;
    }

    @action
    searchTodo = (content) => {
        let con = content.trim();
        this.sdo = this.todos.filter(todo => new RegExp(`${con}`).test(todo.content));
        // console.log('sdo length:',this.sdo.length);
        if(!con) {
            this.sdo.length = 0;
            // console.log('搜索字符串已为空');
            // console.log('sdo length:',this.sdo.length);
        }
        this.searchWord = con;
        // console.log(this.searchWord);
        // console.log(this.todos);
    }

    @action
    completeTodo = (id) => {
        let todo = this.todos.find((todo) => todo.id === id);
        todo.complete = !todo.complete;
    }
}



export default new TodoState();
