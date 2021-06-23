/**
 * reducer
 * 该文件是用于创建一个为Count组件服务的reducer
 * reducer的本质就是一个纯函数
 * reducer函数会接到两个参数。分别为之前的状态(preState,action(动作对象))
 */
import {INCREMENT,DECREMENT} from '../constant';

//初始化state的值
const startValue = 0;

export  default function countReducer(preState = startValue,action){
    //试验
    //console.log(preState,action);//初始化时为0。action为init(即store首次帮你调用reducer)，初始户值为1
    // if(preState === undefined){
    //     //正处于初始化的过程
    //     preState = 0;
    // }
    const {type,data} = action;
    //根据type决定如何加工数据
    switch (type){
        case INCREMENT:
            return preState + data;
        case DECREMENT:
            return preState - data;
        default:
            //初始化状态
            return preState;
    }
}
