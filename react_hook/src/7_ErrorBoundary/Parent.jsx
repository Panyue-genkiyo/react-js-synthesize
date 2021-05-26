import React, {Component} from 'react';
import Child from './Child';
class Parent extends Component {

    state = {
        hasError: '',//用于标识子组件是否产生错误，如果子组件存在错误则这个hasError就携带者错误信息
    }

    //如果Parent组件的子组件出现了任何报错问题，都会调用下面这个方法，并携带错误信息
    //注意这个方法前面要加static关键字，表明这个方法是声明在类上的
    static getDerivedStateFromError(error) {
        console.log(error);
        return {hasError: error};
    }

    render() {
        return (
            <div>
                {/*注意错误边界只适用于生产环境，并不适合开发环境(短时间后仍然会告诉你错误的问题)*/}
                <h2>我是parent组件</h2>
                {this.state.hasError ? <h2>稍后再试</h2> : <Child/>}
            </div>
        );
    }
}

export default Parent;
