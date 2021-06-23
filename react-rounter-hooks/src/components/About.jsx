//home 组件
import React from 'react';
import {useLocation} from 'react-router-dom';
import qs from 'querystring';

const About = () => {

    const location = useLocation();
    console.log(location);

    //querystring解析参数,qs
    let seachObj = qs.parse(location.search.slice(1));
    console.log(seachObj);

    // const  match = useRouteMatch();
    // console.log(match.path); //请求的url 在这儿为/about
    // console.log(match.params);//请求参数 注意这里是动态参数类型
    // console.log(match.isExact);//代表是否为精准匹配

    return (
        <div>
            <h1>我是about组件</h1>
        </div>
    );
};

export default About;
