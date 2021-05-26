import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import './index.css'


export class List extends Component {

    state = {
        users:[],//代表用户数组
        isFirst:true,//代表是否为第一次打开页面
        isLoading:false,//发送请求之后数据回来之前页面是在等待状态的，开始的时候是false
        err:'',//代表请求是否发生错误，存储请求相关的信息
    };


    //订阅消息news
    componentDidMount() {
        this.token =  PubSub.subscribe('news',(_,data) => {
            this.setState(data);
        });
    }


    //在组件要被卸载的时候注意取消订阅
    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }

    render() {
        //注意错误对象error不能作为react的子节点
        //在app状态中存数据的时候要存放错误的信息
        const {users,isFirst,isLoading,err} = this.state;
        return (
            <div>
                <div className="row">
                    {
                        isFirst ? <h2>please input the username and search users</h2>
                                : isLoading ? <h2>Loading...</h2>
                                : err ? <h2 style={{color:'red'}}>{err}</h2>
                                : users.length === 0 ? <h2>啥都没有～没找到哦</h2>
                                    : users.map(userObj => {
                                    return (
                                       <div key={userObj.id} className="card">
                                         <a rel='noreferrer' href={userObj.html_url } target="_blank">
                                            <img alt="head_portrait" src={userObj.avatar_url}
                                             style={{width: '100px'}}/>
                                          </a>
                                          <p className="card-text">{userObj.login}</p>
                                       </div>
                                   );
                                })
                    }
                </div>
            </div>
        );
    }
}
