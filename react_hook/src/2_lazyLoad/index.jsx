//懒加载
//当项目过大，组件过多，懒加载是必要的即用时再加载
//用的最多的路由组件

import React, {Component, lazy, Suspense} from 'react';
import {Route,Switch,NavLink} from 'react-router-dom';
import Loading from './Loading';//Loading组件除外，用普通的import来引入不用懒加载，因为loading组件通常不大

//首先我们不能采用直接import的方式，而是使用懒加载的方式来解决
//lazy懒加载函数(高阶函数)
const Home = lazy(() => import('./Home'));

const About = lazy(() => import('./About'));

class Demo extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <h2>React router</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            <NavLink className='list-group-item' to="/about">About</NavLink>
                            <NavLink className='list-group-item' to="/home">Home</NavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Switch>
                                    这里是有Suspense组件，使用fallback来指定组件加载时的显示效果
                                    <Suspense fallback={<Loading/>}>
                                        <Route path="/about" component={About}/>
                                        <Route path="/home" component={Home}/>
                                    </Suspense>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Demo;
