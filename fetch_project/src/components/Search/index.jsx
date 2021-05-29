import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import Swal from  'sweetalert2';
// import axios from "axios";


class Search extends Component {
    render() {
        return (
            <div>
                <section className="jumbotron">
                    <h3 className="jumbotron-heading">Search Github Users</h3>
                    <div>
                        <input ref={(c)=> this.searchKeyword = c } onKeyUp={event => event.keyCode === 13 ? this.handleSearch() : 0} type="text" placeholder="enter the name you search"/>&nbsp;
                        <button onClick={this.handleSearch}>Search</button>
                    </div>
                </section>
            </div>
        );
    }

    handleSearch = async () => {
        //获取用户输入
        const {searchKeyword:{value:keyword}} = this;

        if(keyword.trim() === ''){
            Swal.fire({
                icon:'error',
                title:'用户名不能为空'
            });
            return;
        }

        //通知list更新状态
        PubSub.publish('news',{isFirst: false,isLoading: true});

        // axios.get(`/api1/search/users?q=${keyword}`).then(
        //     response => {
        //         const {items} = response.data;
        //         PubSub.publish('news',{isLoading: false,users: items});
        //     },
        //     error => {
        //         PubSub.publish('news',{isLoading:false,err:'Sorry,we can\'t find resource you want,status code:404'});
        //     }
        // )

        //使用fetch发送请求
        //发送网络请求
        //fetch的关注分离思想:不能一概而论
        // 不会一下子就把数据给你，而是使用关注分离，而是先告诉你
        // fetch(`/api1/search/users?q=${keyword}`)
        //     .then(
        //          response => {
        //             //注意联系成功并不代表服务器给你的状态码是200，也有可能是404，500，503
        //             console.log("联系服务器成功了");
        //             return response.json();//成功的回调有了返回值,返回值是一个promise实例对象，也就是可以进行.then链式调用
        //          },
        //        //  error => {
        //        //  //断网，不可抗力的因素而导致连接服务器失败
        //        //  //这里默认返回undefined，它属于非promise值(那么接下来它就在下一次then中直接走response，代表数据获取成功，值为undefined)，并不是promise实例
        //        //  console.log("联系服务器失败了",error);
        //        //  //中止promise链式调用
        //        //  return new Promise(()=>{});
        //        // }
        //    ).then(
        //        response => {
        //         console.log("获取数据成功了",response);
        //        },
        //        // error => {
        //        //  console.log("获取数据失败了",error);
        //        // }
        //    ).catch(
        //      (error) => {console.log('请求出错',error);}
        //    );


        // try {
        //     const response = await fetch(`/api1/search/users?q=${keyword}`);//await只能接收成功的结果，失败的结果需要在try catch中进行包裹
        //     const data = await response.json();
        //     console.log(data);
        // }catch (e){
        //     console.log('请求出错',e);
        // }
        try {
            const response = await fetch(`/api1/search/users?q=${keyword}`);
            const data = await response.json();
            PubSub.publish('news',{isLoading: false,isFirst: false,users:data.items});
        }catch (e){
            console.log(`请求出错,${e}`);
            PubSub.publish('news',{isLoading: false,err:'请求出错，请检查网络或请求地址'});
        }

    }
}

export default Search;
