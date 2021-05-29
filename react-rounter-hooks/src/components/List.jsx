import React from 'react';
import {useParams} from 'react-router-dom';

const List = () => {
    let {id} = useParams();//获取动态路由参数
    return (
        <div>
            第{id}篇list
        </div>
    );
};

export default List;
