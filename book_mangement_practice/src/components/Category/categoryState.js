import {observable,action,makeObservable} from 'mobx';

class CategoryState{

    @observable categorys = [];
    @observable isLoading = true;
    @observable categoryId = [];

    constructor() {
        makeObservable(this);
    }

    @action
    loadData = (data) => {
        this.categorys = [...data];
        this.categoryId = data.map(d => d.id);
        //true 就停止加载
        if(this.isLoading){
            this.setIsLoading();
        }
    }

    @action
    setIsLoading = () => {
        this.isLoading = !this.isLoading;
    }

}

export default new CategoryState();
