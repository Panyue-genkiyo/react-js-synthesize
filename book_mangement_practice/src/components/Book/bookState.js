import {observable,action,makeObservable} from 'mobx';

class BookState{

    @observable books = [];
    @observable isLoading = true;
    @observable bookId = [];
    @observable saveBooks = [];
    @observable searchBooks = [];
    @observable isShow = false;


    constructor() {
        makeObservable(this);
    }

    @action
    loadData = (data) => {
        this.books = [...data];
        this.bookId = data.map(d => d.id);
        //true 就停止加载
        if(this.isLoading){
            this.setIsLoading();
        }
    }

    @action
    setIsShow = () => {
        this.isShow = !this.isShow;
    }

    @action
    loadSearchBooks = (data) => {
        this.searchBooks = [...data];
    }

    @action
    deleteSearchBooks = () => {
        this.searchBooks = [];
    }

    @action
    setIsLoading = () => {
        this.isLoading = !this.isLoading;
    }

    @action
    setSaveBooks = () => {
        this.saveBooks = [...this.books];
    }
}

export default new BookState();
