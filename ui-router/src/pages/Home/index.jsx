import React, {Component} from 'react';
import News from './News/index';
import Message from './Message/index';
import MyNavLink from "../../component/MyNavLink";
import {Redirect, Route, Switch} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div>
                <h3>我是Home的内容</h3>
                <div>
                  <ul className="nav nav-tabs">
                    <li>
                        {/*replace无痕浏览*/}
                        {/*<MyNavLink replace to='/home/news'>News</MyNavLink>*/}
                        <MyNavLink to='/home/news'>News</MyNavLink>
                    </li>
                    <li>
                        {/*replace无痕浏览*/}
                      {/*<MyNavLink replace to='/home/message'>Message</MyNavLink>*/}
                        <MyNavLink to='/home/message'>Message</MyNavLink>
                    </li>
                  </ul>
                    {/*注册路由*/}
                    <Switch>
                        <Route  path='/home/news' component={News}/>
                        <Route path='/home/message' component={Message}/>
                        {/*默认展示news*/}
                        <Redirect to='/home/news'/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Home;
