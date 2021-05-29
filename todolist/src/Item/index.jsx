import React, {Component} from 'react';
// import {Button} from "react-bootstrap"
import Swal from 'sweetalert2';
import './index.css';
// import $ from 'jquery'


export default class Item extends Component {

    state = {mouse:false};//维护一个状态,代表鼠标现在是否在某一个item里面

    render() {
        //这里不能写成defaultChecked
        //注意小括号里可以写函数，但是你这里要注意在该函数里返回一个高阶函数
        const {id,name,done} = this.props;
        const {mouse} = this.state;
        return (
                <li style={{background:mouse?'#ddd':'white'}} onMouseLeave={this.handleMouse(false)} onMouseEnter={this.handleMouse(true)}>
                    <label>
                        <input type="checkbox" checked={done} onChange={this.handleCheck(id)}/>
                        <span>{name}</span>
                    </label>
                    <button className="btn btn-danger" onClick={()=>{this.handleDelete(id)}} style={{display:mouse?'block':'none'}}>删除</button>
                </li>
        );
    }

    //鼠标移入移出的回调函数
    handleMouse = (isEnter) => {
        return () => {
            // console.log(isEnter);
            this.setState({mouse:isEnter});
        };
    }

    //同理写成高阶的形式
    handleCheck = (id) => {
        return (event) => {
            //checked是checkBox的一个属性,表示是否勾选
            // console.log(id,event.target.checked);
            const {updateTodo} = this.props;
            const {target} = event;
            updateTodo(id,target.checked);
        }
    }

    //删除一个todo的回调
    //箭头函数没有this
    handleDelete = (id) => {
        // console.log('Item',id);
        const {deleteTodo} = this.props;
        //要用户确定是否删除
        Swal.fire({
            title:'确认删除这个代办事项吗',
            icon:'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: '狠心删除',
            cancelButtonText: '我再想想',
        }).then( res => {
            if(res.isConfirmed){
                deleteTodo(id);
                Swal.fire({
                    title: '删除成功',
                    icon:'success',
                });
            }
        });
    }
}
