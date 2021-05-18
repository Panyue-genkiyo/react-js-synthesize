import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import Detail from './Detail';

class Message extends Component {

    state = {
        myNewsArr: [
            {id:'01',title:'新闻1'},
            {id:'02',title:'新闻2'},
            {id:'03',title:'新闻3'}
        ]
    }

    render() {
        const {myNewsArr} = this.state;
        return (
            <div>
              <ul>
                  {myNewsArr.map((myNewsArrObj)=>{
                      return (
                          <li key={myNewsArrObj.id}>
                              {/*<Link to={`/home/message/detail/${myNewsArrObj.id}/${myNewsArrObj.title}`}>{myNewsArrObj.title}</Link>*/}
                              {/*<Link to={`/home/message/detail?id=${myNewsArrObj.id}&title=${myNewsArrObj.title}`}>{myNewsArrObj.title}</Link>*/}
                              {/*replace设置为true代表代替当前栈顶元素，而不会进行压栈操作,不留痕迹,如果是普通的push操作则是压栈。保留历史记录*/}
                              {/*<Link replace={true} to={{pathname: '/home/message/detail' , state:{id: myNewsArrObj.id, title: myNewsArrObj.title}}}>{myNewsArrObj.title}</Link>*/}
                              <Link to={{pathname: '/home/message/detail' , state:{id: myNewsArrObj.id, title: myNewsArrObj.title}}}>{myNewsArrObj.title}</Link>
                              &nbsp;&nbsp;<button onClick={()=>this.pushShow(myNewsArrObj.id,myNewsArrObj.title)}>push查看</button>
                              &nbsp;&nbsp;<button onClick={() => this.replaceShow(myNewsArrObj.id,myNewsArrObj.title)}>replace查看</button>
                          </li>
                      );
                  })}
             </ul>
            <hr/>
            {/* /!*声明接收params参数   *!/*/}
            {/*<Route path="/home/message/detail/:id/:title"  component={Detail}/>*/}
            {/* 注意search参数是无需声明接收的*/}
            {/*    <Route path="/home/message/detail"  component={Detail}/>*/}
            {/* 注意search参数(不在浏览器上方显示这些查询参数的具体值)是无需声明接收的 ,且state参数即使刷新页面也可以保留，换句话说，刷新页面之后依然保有原来的数据，除非你清空浏览器历史记录 */}
                <Route path="/home/message/detail"  component={Detail}/>

                {/*使用history自带API实现前进后退*/}
                <button onClick={this.go(-1)}>回退</button>&nbsp;
                <button onClick={this.go(1)}>前进</button>
                {/*<button onClick={this.go}>前进2步</button>*/}

           </div>
        );
    }

    replaceShow = (id,title) => {
        ///编写一段代码，让其实现跳转到detail组件，且为replace跳转
        //借助路由组件的api
        //无痕浏览

        //编程式路由携带params参数
        // this.props.history.replace(`/home/message/detail/${id}/${title}`);//replace跳转

        //编程式路由携带search参数
        // this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)

        //编程式路由携带state参数
        this.props.history.replace("/home/message/detail",{id,title});

    }

    pushShow = (id,title) => {

        //编程式路由携带params参数
        // this.props.history.replace(`/home/message/detail/${id}/${title}`);//replace跳转

        //编程式路由携带search参数
        // this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)

        //编程式路由携带state参数
        this.props.history.push("/home/message/detail",{id,title});
    }

    // back = () => {
    //     this.props.history.goBack();
    // }
    //
    // forward = () => {
    //     this.props.history.goForward();
    // }


    go = (n) => {
        return  () => {
            this.props.history.go(n);
        }
    }

    // go = () => {
    //     this.props.history.go(2);
    // }


}

export default Message;
