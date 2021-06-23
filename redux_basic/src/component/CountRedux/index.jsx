import React, {Component} from 'react';
//引入store，来获取redux中的状态

//引入actionCreator专门用于创建action对象

//利用redux书写count组件
class CountRedux extends Component {

    increment = () => {
        const {value}  = this.selectNumber;
        //通知redux加value;
        //redux更改了状态，默认是不会重新渲染页面的
        // store.dispatch(createIncrementAction(value*1));//分发action对象
        this.props.increment(value * 1);
    }

    decrement = () => {
        const {value} = this.selectNumber;
        // store.dispatch(createDecrementAction(value * 1));
        this.props.decrement(value * 1);
    }

    incrementIfOdd = () => {
        const {value} = this.selectNumber;
        const {count} = this.props;
        if(count % 2 !== 0){
            this.props.increment(value * 1);
        }
    }

    incrementAsync = () => {
        const {value} = this.selectNumber;
        //异步加法
        // store.dispatch(createIncrementAsyncAction(value*1,500));
        this.props.asyncIncrement(value * 1,500);
    }

    //组件一挂载之后去监测redux里的状态是否变化
    // componentDidMount() {
    //     //监测redux中状态的变化
    //     //只要redux中状态发生变化，我就调用render重新渲染页面
    //     //只要状态发生改变，都会调用subscribe中的这个回调函数
    //     store.subscribe(()=>{
    //        // console.log('@');
    //         this.setState({});
    //     });
    // }

    render() {
        console.log(`ui组件接收到了props`,this.props);
        const {count} = this.props;
        return (
          <div>
              {/*store.getState获取状态,store调用reducer来初始化状态*/}
              {/*<h1>当前求和为:{store.getState()}</h1>*/}
              <h1>当前求和:{count}</h1>
              <select ref={c=>this.selectNumber = c}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
              </select>
              &nbsp;<button onClick={this.increment}>+</button>&nbsp;
              <button onClick={this.decrement}>-</button>&nbsp;
              <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
              <button onClick={this.incrementAsync}>异步加</button>
          </div>
        );
    }
}

// export function RT(){
//      let [count,setCount] = useState(0);
//     const  add = () => {
//           setCount(++count);
//     }
//     return (
//         <div>
//             <p>{count}</p>
//             <button onClick={add}>加一</button>
//         </div>
//     )
// }

export default CountRedux;
