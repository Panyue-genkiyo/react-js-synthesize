import React, {useState, useMemo, useCallback} from 'react';
import UserInfo from "../UserInfo";

const HookTest = () => {

    console.log('HookTest render');

    let  [a,setA] = useState(0);
    let  [b,setB] = useState(0);
    let  [age,setAge] = useState(18);
    let  [message,setMessage] = useState('');

    //副作用
    //记忆状态
    let times = useMemo(() => {
        return a;
    },[a]);

    //副作用辐射
    //只有age改变才会形成新的userInfo
    const userInfo = useMemo(()=>{
        return {
            name:'jack',
            age,
        }
    },[age]);


    //我很高兴
    //解决父子组件重复渲染
    const logMessage = useCallback(()=>{
         return message;
    },[message]);


    return (
        <div style={{border:'darkgray'}}>
            <p>a:{a},b:{b}</p>
            <button onClick={()=>{setA(a+1)}}>
               点击我为a加1
            </button>
            <button onClick={()=>{setB(b+1)}}>
                点击我为b加1
            </button>
            <button onClick={()=>{setAge(age+1)}}>
                长大一岁
            </button>
            <button onClick={()=>{setMessage(`hello,there!父组件的状态a已修改了${times}次`) }}>
                change messages
            </button>
            <p>a改变了{times}次</p>
            <hr/>
            <UserInfo userInfo={userInfo} logMessage={logMessage}/>
        </div>
    );
};

export default HookTest;
