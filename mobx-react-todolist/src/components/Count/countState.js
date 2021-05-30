import  {observable,action,makeObservable} from 'mobx';

class CountState{
   @observable count = 0;

   constructor() {
       makeObservable(this);
   }

   @action
    addOne = () => {
       this.count ++;
    }

    @action
    minsOne = () => {
       this.count --;
    }


}

export default new CountState();
