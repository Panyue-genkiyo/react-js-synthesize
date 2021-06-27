import React, {useMemo} from 'react';
import {useSelector} from 'react-redux'

const Test = () => {

    const count = useSelector(state => state.count);
    //
    // const appC = useRef();
    //
    // appC.current = count;

    //全局只执行一次
    // useEffect(()=>{
    //    const  id = setInterval(() =>{
    //        console.log(appC.current);
    //     })
    //     return () => {
    //         clearInterval(id);
    //     }
    // },[]);

    let child = useMemo(() => {
        return <p>
            现在上方组件的count值为{count}
        </p>
    },[count]);

    return (
        <div>
            {child}
        </div>
    );
};

export default Test;
