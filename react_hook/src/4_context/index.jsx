//利用Context实现组组件和孙组件的数据传递
import React, {Component} from 'react';

import  './index.css'

//创建上下文
const MyContext = React.createContext();
const {Provider,Consumer} = MyContext;

class A extends Component{

    state = {
        username : 'Tom',
        age:18
    }

    render(){
        const {username,age} = this.state;
        return(
            <div className='parent'>
                <h3>我是A组件</h3>
                <h4>我的用户名是{username}</h4>
                {/*此时A与B是父子关系*/}
                {/*使用provider之后此时子组件和孙组件就都可以收到你传递的用户名了*/}
                <Provider value={{username,age}}>
                    <B/>
                </Provider>
            </div>
        )
    }
}


class B extends Component{
    render(){
        return(
            <div className='child'>
                <h3>我是B组件</h3>
                {/*此时B和C是父子关系*/}
                <C/>
            </div>
        )
    }
}

// class C extends Component{
//     //声明接收context
//     //类式组件首先要声明接收context。才能使用祖先传递过来的值
//     static contextType = MyContext;
//
//     render() {
//         // console.log(this.context);
//         const {username,age} = this.context;
//         return(
//             <div className='grand'>
//                 <h3>我是C组件</h3>
//                 <h4>我从A组件接收到的用户名是:{username}</h4>
//                 <h4>我从A组件接收到的年龄是:{age}</h4>
//                 {/*此时A与C是祖孙关系*/}
//                 {/*祖孙关系的Context使用*/}
//             </div>
//         )
//     }
// }

//如果C是函数式组件
//使用Consumer(消费者)
//用函数式组件必须使用Consumer
const C = () => {
    return (
        <div className='grand'>
            <h3>我是C组件</h3>
            <Consumer>
                {
                    value => {
                        return(
                            <>
                                <h4>我从A组件接收到的用户名是:{value.username}</h4>
                                <h4>我从A组件接收到的年龄是:{value.age}</h4>
                            </>
                       )
                    }
                }
            </Consumer>
            {/*此时A与C是祖孙关系*/}
            {/*祖孙关系的Context使用*/}
        </div>
    )
}

export default A;
