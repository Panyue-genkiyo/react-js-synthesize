import React, {Component} from 'react';
import Search from "./components/Search";
import {List} from "./components/List";

class App extends Component {


    /**
     * 消息订阅和发布机制 pubsubJs
     * 订阅消息和发布消息，使得组件之间相互轻松传递与状态有关的信息
     */


    //初始化状态
    //users初始值为空数组
    state = {
        users:[],//代表用户数组
        isFirst:true,//代表是否为第一次打开页面
        isLoading:false,//发送请求之后数据回来之前页面是在等待状态的，开始的时候是false
        err:'',//代表请求是否发生错误，存储请求相关的信息
    };

    render() {
        // const {users} = this.state;
        //{...this.state} props允许这种方式批量传递
       return (
         <div>
             <div className="container">
                 <Search updateAppState = {this.updateAppState} />
                 <List {...this.state}/>
             </div>
         </div>
      );
    }

    //更新app的状态
    updateAppState = (stateObj) => {
        this.setState(stateObj);
    }


}

export default App;
