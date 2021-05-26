import React, {Component} from 'react';

class Demo extends Component {

    state = {
        count : 0,
    }

    add = () => {
        // const {count} = this.state;
        //更新状态
        // this.setState({count: count + 1});//setState是一个同步的方法，但setState更新完了引起的后续动作是异步的
        // console.log(this.state.count);//异步的更改状态,由于是异步的，在这里你不能马上看到更改之后状态的值
        //第一种写法:对象式的setState() 传入更新后的状态改变对象(该对象可以体现出状态的改变)，传入一个回调函数用来拿到最新的状态更新值
        //     this.setState({count: count + 1},()=>{
        //         //这个回调函数是可选参数,它在状态更新完毕且页面重新渲染(也就是render方法被执行之后)执行
        //         console.log(this.state.count);//这里可以拿到最新的state(状态里的值)
        //     });

        //第二种写法:函数式的setState()
         this.setState((state,props) => {
             //该函数可以接到state和外部传递过来的props,返回一个状态改变的对象
             console.log(state, props);//测试
             return {
                 count: state.count + 1,//在这里不用手动获取原来的状态，因为react传递了state和props到这个回调函中
             }
         }, () => {
             console.log(this.state.count);//在第二个回调中获取最新的状态更新值
         });
        /**
         * 说明:
         *   1. 对象式的setState()是函数式的setState()的简写方式(语法糖)
         * 使用原则:
         *   1.如果新状态不依赖愿状态 ==> 使用对象方式
         *   2.如果新状态依赖原状态 ===> 使用函数方式
         *   3.如果需要在setState()执行后获取最新的数据状态数据,
         *     要在第二个callback函数中(可选参数:回调函数)获取
         */
    }

    render() {
        return (
            <div>
                <h1>当前求和为{this.state.count}</h1>
                <button onClick={this.add}>点我加一</button>
            </div>
        );
    }
}

export default Demo;
