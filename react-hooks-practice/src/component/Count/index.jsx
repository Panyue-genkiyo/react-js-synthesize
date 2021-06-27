import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {increment,decrement} from '../../redux/action/count'

const Count = () => {

    const count = useSelector(state => state.count);

    const dispatch = useDispatch();

    return (
        <div>
            <p>求和为:{count}</p>
            <button  onClick={()=>{dispatch(increment())}}>点我加一</button>
            <button  onClick={()=>{dispatch(decrement())}}>点我减一</button>
        </div>
    );
};


export default Count;
