import {INCREMENT} from '../constant';

export const increment = (playLoad) => {
    return {
        type:INCREMENT,
        playLoad,
    };
}

//处理异步加,引入中间件
export const asyncIncrement = (playLoad) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(increment(playLoad))
        },2000)
    }
}
