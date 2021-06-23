//每一个组件状态都有自己的actionCreator
//该组件专门为Count组件生成action对象
import {INCREMENT,DECREMENT} from '../constant';

//分别暴露
export const increment = data => ({type:INCREMENT,data});
export const decrement = data => ({type:DECREMENT,data});

//异步action中一般都会调用同步action
export const incrementAsync = (data,time) => {
    //异步action返回函数，而同步action返回对象
    return (dispatch) => {
        //异步+闭包
        setTimeout(()=>{
            //此时又是同步action
            dispatch(increment(data));
        },time);
    }
}

