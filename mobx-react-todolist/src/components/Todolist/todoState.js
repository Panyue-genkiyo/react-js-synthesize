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


    // @action
    // changeSearchWord = (str) => {
    //     this.searchWord = str;
    // }


    @action
    setSearchWord = (str) => {
        this.searchWord = str;
    }

    @action
    deleteTodo = (id) => {
        console.log('删除');
        this.todos = this.todos.filter(todo => todo.id !== id);
        // console.log(this.todos);
        // if(this.sdo.length){
        //     this.sdo.length = 0;
        // }
        this.setSearchWord('');
        //console.log(this.sdo.length);
        // this.sdo.length = 0;
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
        let index1 = con.indexOf('\\');
        let index2 = con.indexOf('[');
        // console.log('index',index);
        if(index1 !== -1) con = con.replace(/\\/g,'\\\\');
        if(index2 !== -1) con = con.replace(/\[/g,'\\[');
        // console.log(con);
        this.sdo = this.todos.filter(todo => new RegExp(`^${con}`).test(todo.content));
        // console.log(this.sdo);
        // console.log('sdo length:',this.sdo.length);
        if(!con) {
            this.sdo.length = 0;
            // console.log('搜索字符串已为空');
            // console.log('sdo length:',this.sdo.length);
        }
        this.setSearchWord(con);
        // console.log(this.searchWord);
        // console.log(this.todos);
    }

    @action
    completeTodo = (id) => {
        let todo = this.todos.find((todo) => todo.id === id);
        todo.complete = !todo.complete;
        this.setSearchWord('');
    }
}


export default new TodoState();
