import {action,observable,makeObservable} from 'mobx'


class AppState{

    @observable current = 'books';
    @observable saveCurrent = ['books'];

    constructor() {
        makeObservable(this);
    }

    @action
    setCurrent = (c) => {
        this.current = c ;
    }

    @action
    setSaveCurrent = () => {
        this.saveCurrent.push(this.current);
    }

    @action
    setInitSearchText = (text) => {
        this.initSearchText = text;
    }

}

export default new AppState();
