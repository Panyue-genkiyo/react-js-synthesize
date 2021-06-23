import {INCREMENT} from '../constant';

const initailState = 0;

export const reducer = (state = initailState, action) => {
    const {type,playLoad} = action;
    if(type === INCREMENT){
       return state += playLoad;
    }
    return state;
}
