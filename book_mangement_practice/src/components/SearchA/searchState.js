import {observable,makeObservable,action} from 'mobx'


class SearchState{

    @observable value = '';
    @observable selectValue = '';
    @observable minValue = 50;
    @observable maxValue = 300;
    @observable flag = false;

    constructor() {
        makeObservable(this);
    }

    @action
    setValue = (value) => {
        this.value = value;
    }

    @action
    setSelectValue = (value) => {
        this.selectValue = value;
    }

    @action
    setMaxValue = (value) => {
        this.maxValue = value;
    }

    @action
    setMinValue = (value) => {
        this.minValue = value;
    }

    @action
    setFlag = () => {
        this.flag = !this.flag;
    }

}

export default new SearchState();
