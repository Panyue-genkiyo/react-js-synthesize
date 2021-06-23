import React, {PureComponent} from 'react';
import './index.css'

class Parent extends PureComponent {

    state = {
        carName : '奔驰c63',
        stus:['tom','jack','name'],
    }

    addStu = () => {
        const {stus} = this.state;
        // stus.unshift('小刘');
        // this.setState({stus});
        //这样才能正确改掉状态
        this.setState({stus: [...stus,'小刘']});
    }

    changeCar = () => {
        this.setState({carName:'迈巴赫'});
        // const obj = this.state; //此时obj和this.state指向同一个对象的引用
        //         // obj.carName  = '迈巴赫';
        //         // this.setState(obj);//此时虽然使用了setState来更改状态，但由于obj和原来的state仍然是同一个对象，
    }

    //改变即使组件stat没有改变，也会render效率低的问题
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     //编写shouldComponentUpdate声明周期钩子
    //     // this.state和this.props目前的state和props
    //     //nextProps和nextState代表变化的目标props和state
    //     // console.log(this.props,this.state);
    //     // console.log(nextProps,nextState);
    //     // return this.state.carName !== nextState.carName;
    //     return this.state.carName !== nextState.carName;
    // }

    render() {
        const {carName,stus} = this.state;
        console.log('parent----render');
        return (
            <div className='parent'>
               <h3>我是parent组件</h3>
                <span>我的车名字是{carName}</span>
                <p>
                    {stus}
                </p>
                <button onClick={this.changeCar}>点我换车</button>
                <button onClick={this.addStu}>点我添加学生</button>
                <Child carName='奥拓'/>
            </div>
        );
    }
}

class Child extends PureComponent{

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     // console.log(this.props);
    //     // console.log(nextProps);
    //     return this.props.carName !== nextProps.carName;
    // }

    render() {
        const {carName} = this.props;
        console.log('child----render');
        return (
            <div className='child'>
                <h3>我是child组件</h3>
                {/*子组件明明不使用父组件的传来的任何状态值，但是它依然会更新，这样就会产生效率问题*/}
                <span>我接到的车是:{carName}</span>
            </div>
        );
    }
}

export default Parent;
