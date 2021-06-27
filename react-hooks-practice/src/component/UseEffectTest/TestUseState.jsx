import React ,{useState, useRef} from 'react';

const TestUseState = () => {

    //每一帧都有自己的状态和值，以及函数
    //测试
    const [count,setCount] = useState(0);

    const delayButton = () => {
        setTimeout(() => {
            setCount(count + 1);
        },3000);
    }


    //首先点击一次delayButton，再快速点击三次普通自增三次
    //首先快速自增render3次，从0-3；
    //然后达到三秒之后快速变为1:(原因:函数组件都有自己的帧数)
    //改变用ref存全局count值

    return (
        <div>
            <p>count:{count}</p>
            <button onClick={() => {setCount(count + 1)}}>
                直接count加1
            </button>
            <button onClick={delayButton}>
                延迟3秒加一
            </button>
        </div>
    );
};


export const TestUseStateByRef  = () => {

    const [a,setA] = useState(1);

    ////初始化该组件第一次render才会走这一步,如果是复用组件则会直接忽略到这步
    const currentA = useRef(a);

    //保存当前的值
    //始终保持与最新的状态a的值对等关系
    currentA.current = a;

    const preCurrent = useRef(1);

    //保存前一个状态
    const preA = preCurrent.current; //第一次:1
    // preCurrent.current = a;

    console.log(`过去prev:${preA}`)
    console.log(`现在a:${a}`);

    const buttonByPrePlusNow = () => {
        //测试输出
        // console.log(preA,a);
        setA(a + preA);
        preCurrent.current = a;
    }

    const delayButtonByNowPlusOne = () => {
        setTimeout(() => {
            //始终将最新状态值设置为前一帧的状态值+1
            setA(currentA.current + 1);
        },3000);
        preCurrent.current = a;
    }

    return (
        <div>
            <p>用ref改写的帧数</p>
            <p>a:{a}</p>
            <button onClick={() => {setA(a + 1);preCurrent.current = a}}>
                直接a加1
            </button>
            <button onClick={delayButtonByNowPlusOne}>
                延迟3秒加一
            </button>
            <button onClick={buttonByPrePlusNow}>
                加上前一个状态a的值
            </button>
        </div>
    )
}


export default TestUseState;
