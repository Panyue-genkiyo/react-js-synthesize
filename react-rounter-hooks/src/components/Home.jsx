//home 组件
import React from 'react';
import {Switch,Route,Link,useRouteMatch} from 'react-router-dom';

//在home组件中存在嵌套路由
//嵌套路由的使用useRouteMatch来代替
const Home = () => {

    let match = useRouteMatch();//获取父级路由，在这里是'/home'
    // console.log(match.url)
    /**
     * // The `path` lets us build <Route> paths that are
     // relative to the parent route, while the `url` lets
     // us build relative links.
     */
    let {path,url} = match;
    // console.log('path',path);
    // console.log('url',url);
    return (
        <div>
            <h1>我是home组件</h1>
            <ul>
                <li>
                    <Link to={`${url}/part1`}>
                        模块一
                    </Link>
                </li>
                <li>
                    <Link to={`${url}/part2`}>
                        模块二
                    </Link>
                </li>
                <li>
                    <Link to={`${url}/part3`}>
                        模块三
                    </Link>
                </li>
        </ul>
            <Switch>
                <Route path={`${path}/part1`} component={() => <div>我是home组件中模块一的内容</div>}/>
                <Route path={`${path}/part2`} component={() => <div>我是home组件中模块一的内容</div>}/>
                <Route path={`${path}/part3`} component={() => <div>我是home组件中模块一的内容</div>}/>
            </Switch>
        </div>
    );
};

export default Home;
