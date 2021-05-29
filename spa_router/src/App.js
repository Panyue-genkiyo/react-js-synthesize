import React, {Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import About from "./pages/About"
import Home from "./pages/Home"
import Text from "./pages/Text"
import Header  from "./component/Header"

import MyNavLink from "./component/MyNavLink";


class App extends Component {
    render() {
        return (
            //react路由，spa(web单页面应用,一个完整的页面，只做页面的局部刷新，数据都通过ajax请求来获取，并在前端异步展示)
            //即单页面多组件
            //每一个路径对应一个组件,这就存在某种映射关系(key:path(路径),value:组件)
            //路由的理解:
               //一个路由就是一个映射关系，一个key就是一个路径，一个value可能是function或者component
               /*
                   后端路由(key:请求路径,value:函数):注册方式:router.get(Path,function(req,res)),
                   根据请求路径找到匹配的路由，调用路由中的函数来处理请求，返回相应数据
               */
               /*
                   前端路由(key:请求路径,value:组件):注册方式:<Router path="/test" component={Test}>
                   当浏览器的path变为/test时，当前路由组件就会变为Test组件
                */
               /**
                * 前端路由原理:主要借助bom中的history对象
                *    对于react-router-dom的理解:有三种形式:web,native,any
                *    react的一个插件，专门用来实现一个spa应用
                *    基于react项目都会使用到此库
                *    导航区的a标签改为Link标签
                *      <Link to='/xxxx'>Demo</Link>
                *    展示区写Route标签进行路径的匹配
                *      <Route path='/xxxx' component={Demo}/>
                *    <App>是最外侧包裹一个<BrowserRouter>或<HashRouter>
                */
            /**
             *  路由组件和一般组件的区别
             *  一般组件放在component中,路由组件放在pages
             *    react给路由组件会传递三个重要的props信息，分别叫做history,location,match
             *         history:
             *            go:f go(n)
             *            goBack: f goBack()
             *            goForward: f goForward()
             *            push: f push(path,state)
             *            replace: f replace(path,state)
             *         location:
             *            pathname:"/about"
             *            search:"",
             *            state:undefined
             *         match:
             *            params:{}
             *            path:"/about"
             *            url:"/about"
             */
            <div>
                    <div className="row">
                        <div className="col-xs-offset-2 col-xs-8">
                            <Header/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-2 col-xs-offset-2">
                            <div className="list-group">
                                {/*原生html中靠<a>跳转不同的页面*/}
                                {/*<a className="list-group-item active" href="./about.html">About</a>*/}
                                {/*<a className="list-group-item" href="./home.html">Home</a>*/}
                                {/*在react中靠路由链接实现,达到切换组件的效果*/}
                                {/*link换成navLink就可以存在点那个那个就高亮的效果，追加样式类名active*/}
                                <MyNavLink to="/about" title="About">About</MyNavLink>
                                <MyNavLink to="/home" title="Home">Home</MyNavLink>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="panel">
                                <div className="panel-body">
                                    {/*注册路由，router，属性是path和component*/}
                                    {/*如果在注册的路由之外没有包裹switch，则配置了一个路径的路由组件全部都会展示，而不会出现覆盖的问题*/}
                                     <Switch>
                                         <Route path="/about" component={About}/>
                                         <Route path="/home" component={Home}/>
                                         {/*如果包裹了switch则它匹配到了一致的路由就不会往下接着匹配*
                                           即下面的Text路由组件不会匹配*/}
                                         {/*<Route path="/home" component={Text}/>*/}
                                         <Redirect to="/home"/>
                                     </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}


export default App;
