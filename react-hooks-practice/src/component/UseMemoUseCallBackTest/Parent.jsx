import React, {useCallback, useState} from 'react';
import Child from './Child';

const Parent = () => {

   const [count,setCount] =  useState(0);
   const [flag,setFlag] = useState(false);

   const parentClick = () => {
       console.log('click parent');
       setCount(prevState => prevState + 1);
   };

    //返回是不是新函数
    //只有flag改变之后,子组件Child才会改变,因为数据props发生改变
   const childClick = useCallback(() => {
       console.log(`child click,${flag}`);
   },[flag]);

    return (
        <div>
            Count:{count}
            <button onClick={parentClick}>
                click parent
            </button>
            <button onClick={()=>{setFlag(!flag)}}>
                change flag
            </button>
            <Child clickChild={childClick}/>
        </div>
    );
};



export default Parent;
