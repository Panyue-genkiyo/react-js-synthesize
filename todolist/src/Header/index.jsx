import React, {Component} from 'react';
import ProtoTypes from 'prop-types';
import {nanoid} from 'nanoid';
import Swal from 'sweetalert2';
import './index.css';


//nanoid 生成全世界随机的唯一的字符串id数据
// console.log(nanoid());
// console.log(nanoid());
// console.log(nanoid());
export default class Header extends Component {
    render() {
        return (
            <div className="todo-header">
                <input type="text" placeholder="请输入你的任务名称，按回车键确认" onKeyUp={this.handleKeyUp}/>
            </div>
        );
    }

    //对接受的参数进行参数限制
    static propTypes = {
        addTodo: ProtoTypes.func.isRequired,
    }

    //键盘事件的回调
    handleKeyUp = (e) => {
        //解构赋值获取获取你当前的按键,以及你输入的值
        const {target, keyCode} = e;
        //判断是否是回车按键
        if (keyCode === 13) {
            console.log(target.value);
            //子组件给父组件传递数据一样通过props;
            //要求父组件通过props传递函数，在子组件需要给父组件传递参数的时候调用改组件就可以了
            if (target.value.trim() === '') {
                // alert('输入不能为空');
                Swal.fire({
                    icon: 'error',
                    title: '添加失败',
                    text: '添加的事项不能为空'
                }).then(r => {
                });
                return;
            }
            const newTodoObj = {id: nanoid(), name: target.value, done: false};
            const {addTodo} = this.props;
            addTodo(newTodoObj);
            //清空输入
            target.value = '';
        }
    }
}
