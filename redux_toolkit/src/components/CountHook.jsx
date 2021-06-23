import React from 'react';
import {useSelector,useDispatch} from "react-redux";
import {increment,asyncIncrement} from '../redux/reducer/count';


const Count = () => {

    const dispatch = useDispatch();
    const count = useSelector((state) => state.count.count);

    return (
        <div>
            <h1>Count:{count}</h1>
            <button onClick={() => {dispatch(increment(1))}}>加一</button>
            <button onClick={() => {dispatch(asyncIncrement(1))}}>异步加一</button>
        </div>
    );
};

export default Count;
