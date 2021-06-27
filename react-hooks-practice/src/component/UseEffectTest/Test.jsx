import React, {useEffect, useState} from 'react';

const Test = () => {

    const [count, setCount] = useState(0);

    console.log(`Test Render`);

    useEffect(()=>{
        //新effect，旧effect
      setTimeout(() => {
          //每次在重新render的时候都存在新的prop state
          //异步首先渲染ui，在ui渲染完成后,运行该render存在的函数effects
          console.log(count);
      },3000)

        //清除上次render留下来的副反应
        //首先渲染新的UI
        //清除旧的effect
        //运行新的effect
       return () => {
          setTimeout(()=>{
              console.log(`清除上次的render:${count}`);
          },3000)
        }
    })

    return (
        <div>
            Count:{count}
            <button onClick={()=>{setCount(count + 1)}}>
                click me
            </button>
        </div>
    );
};

export default Test;
