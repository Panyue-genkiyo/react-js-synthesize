//容器组件需要靠react-redux来创建,左手ui，右手redux
//安装react-redux
// //引入ui
// import CountUI from '../../component/CountRedux';
//引入connect用于连接UI组件与redux
import {connect} from 'react-redux';
// import {INCREMENT,DECREMENT}  from '../../redux/constant'
import {
   increment,
    decrement,
    incrementAsync
} from '../../redux/actions/count';
import  {Component} from 'react';



//在容器组件中直接定义ui组件
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
        this.props.incrementAsync(value * 1,500);
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
        // console.log(`ui组件接收到了props`,this.props);
        const {count} = this.props;
        return (
            <div>
                {/*store.getState获取状态,store调用reducer来初始化状态*/}
                {/*<h1>当前求和为:{store.getState()}</h1>*/}
                <h1>我是Count组件,下方组件的总人数为{this.props.persons.length}</h1>
                <h4>当前求和:{count}</h4>
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




//创建并暴露容器组件
//connect方法在第一次调用时需传递俩个参数(且这两个参数必须都是函数)


//mapStateToProps函数(将状态映射为props的方法)的返回值作为状态(state)传递给了CountUI(即其子组件)组件 返回的对象的key即props的key，返回对象的值即props的value
//redux的状态
//react-redux在调用a函数时，已经将redux中所保存的状态(state)传入该函数了，且store已经被传入该容器组件了
// const mapStateToProps = state => ({count:state.count,persons:state.persons});

//mapDispatchToProps函数(将分发映射为props(即传递给子组件操纵状态的方式))传递给ui组件操纵状态的方法(默认传递给你dispatch方法)
//传递操作redux中状态的方法
//通知redux执行加法，dispatch(createIncrementAction(number));
// const mapDispatchToProps = dispatch => ({
//     increment: number => dispatch(increment(number)),
//     decrement: number => dispatch(decrement(number)),
//     asyncIncrement: (number,time) => dispatch(incrementAsync(number,time)),
// });

//


//简写形式
//mapDispatchToProps可以传递两种类型的参数 (第一种是常规的函数，第二种是简写形式即一个对象，每个项的值即为某个固定的action,自动帮你做分发)
// export default connect(
//     state => ({count:state}),
//     {
//         increment: createIncrementAction, //react-redux自动分发。只要你传递的是一个actiob
//         decrement: createDecrementAction,
//         asyncIncrement: createIncrementAsyncAction
//     }
// )(CountUI);

export default connect(
    state => ({
        count: state.count,
        persons:state.persons
    }),
    {
        //对象的简写形式
        increment,
        decrement,
        incrementAsync
    }
)(CountRedux);



