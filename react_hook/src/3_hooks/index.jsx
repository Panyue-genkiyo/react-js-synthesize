//利用函数式组件以及hook来实现按钮加一
import {useState,useEffect,useRef} from 'react';
import ReactDOM from 'react-dom'


//Demo组件的调用次数是1+n次,类似与类式组件的render()
//首次渲染为一次，后面当你每次更改状态的时候都会重新的调用一次
const Demo = () => {
    // console.log('Demo');
    //注意函数式组件没有this，只能用setState来做
    //此时使用第一个hook useState()，借助这个，函数式组件也能随心所欲的操控state

    //数组的解构赋值
    const [count,setCount] = useState(0); //返回一个数组(第一个元素就是state(状态xxx),第二个元素就是操作状态的方法(setXxx))
    const [name,setName]= useState('tom');
    // const [time,setTime] = useState(new Date());

    //useEffect hooks
    //参数是回调函数，相当于一个声明周期钩子(componentDidMount和componentDidUpdate和componentWillUnmount);
    //第二个参数如果是空数组，这个钩子函数只会在首次渲染时发生改变
    //第二个数组[]是依赖数组，监测数组里面的某个state，比如[name]就代表监测name的值，当状态name的值发生改变就执行里面的钩子函数，空数组代表不监测任何属性state
    useEffect(()=>{
        // console.log('@'); //这相当与声明周期钩子
        let timer = setInterval(()=>{
            setCount(count => count + 1);
        },1000)

        //这个函数返回的函数相当于钩子componentWillUnmount
        return () => {
            // console.log('@');
            clearInterval(timer);
        }

    },[]);


    ///ref hook
    //类似于类式组件的React.createRef()
    const ref = useRef();


    const add = () => {
        // console.log('你点击到了按钮加')
        //setCount的第一种写法
        // setCount(count+1);
        setCount((count)=>{
            // 该回调函数参数为函数，接收原本的状态值，返回新的状态值，内部用来覆盖原来的状态值
            return count + 1;
        })
    }


    const changeName = () => {
        setName('jack');
    }

    const unmount = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    }

    //提示输入的回调
    const showData = () => {
        alert(ref.current.value);
    }

    return (
        <div>
            <input type="text" ref={ref} placeholder={'please input something'}/>
            <h2>当前求和为:{count}</h2>
            <h2>我的名字是:{name}</h2>
            <button onClick={add}>点我加1</button>
            <button onClick={changeName}>点我改名</button>
            <button onClick={unmount}>卸载组件</button>
            <button onClick={showData}>提示数据</button>
        </div>
    )
}

export default Demo; //默认暴露Demo
