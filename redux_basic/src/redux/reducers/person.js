//person的状态
//person状态初始化，以及定义后续的操作
import {ADD_PERSON} from '../constant';

const initState = [
    {id:'001',name:'tom',age:18},
];

//redux中的reducer必须是一个纯函数
export const personReducer = (perState = initState,action) => {
    const {type,data}  = action;
    switch (type){
        case ADD_PERSON:
            //添加一个人
            //perState.unshift(data) 此处不可以这样写，这样会导致perState被改写，peronReducer就不是一个纯函数了
            return [data,...perState]; ///浅比较
        default:
            return perState;
    }
}

