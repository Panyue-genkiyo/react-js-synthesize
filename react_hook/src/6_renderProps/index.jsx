import React, {Component} from 'react';
import './index.css';

class Parent extends Component {
    render() {
        return (
            <div className={'parent'}>
                <h3>我是parent组件</h3>
                {/*父子组件传递东西用props*/}
                {/*组件标签的内容到了组件被保存在了props.children身上*/}
                {/*renderProps*/}
                <A render={(name)=><B name={name}/>}/>
            </div>
        );
    }
}

class A extends Component {
    state = {
        name:'tom',
    }
    render() {
        // console.log(this.props.children);
        const {name} = this.state;
        return (
            <div className='a'>
                <h3>我是A组件</h3>
                {/*光看下面这行你还并不清楚A组件和B组件是什么关系*/}
                {this.props.render(name)}
            </div>
        );
    }
}

class B extends Component {
    render() {
        console.log('B---render');
        return (
            <div className='b'>
                <h3>我是B组件:{this.props.name}</h3>
            </div>
        );
    }
}


export default Parent;
