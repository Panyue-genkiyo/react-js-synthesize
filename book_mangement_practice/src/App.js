import React from 'react';
import {inject,observer} from 'mobx-react';
import {useHistory} from "react-router-dom";
import {useEffect} from "react";
import {Menu} from "antd";
import {BookOutlined, PicCenterOutlined, PlusSquareOutlined,PlusCircleOutlined,SearchOutlined} from "@ant-design/icons";
import './style/main.css';



const App = ({root,children}) => {


    const history = useHistory();

    const {setCurrent,current} = root.AppStore;

    const {deleteSearchBooks,searchBooks,isShow,setIsShow} = root.bookStore

    const {setValue} = root.searchStore;


    const handleClick = (e) => {
        console.log(e.key);
        if(isShow) setIsShow();
        setCurrent(e.key);
        //处理从搜索页点击books导航再回到all books的状态，因为此时current没有改变，手动触发history.push操作
        if(current === 'books'){
            history.push('/books');
            deleteSearchBooks();
        }
        setValue('')
    }

    useEffect(() => {
            // console.log(current);
            history.push(`/${current}`);
    },[history, current, searchBooks.length]);



    return (
        <div>
            <div>
                <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                    <Menu.Item key="books" icon={<BookOutlined/>}>
                        首页
                    </Menu.Item>
                    <Menu.Item key="categorys" icon={<PicCenterOutlined/>}>
                        类别信息
                    </Menu.Item>
                    <Menu.Item key="addBook" icon={<PlusSquareOutlined/>}>
                        添加图书
                    </Menu.Item>
                    <Menu.Item key="addCategory" icon={<PlusCircleOutlined/>}>
                        添加类别
                    </Menu.Item>
                    <Menu.Item key="searchBooks" icon={<SearchOutlined/>}>
                        搜索图书
                    </Menu.Item>
                </Menu>

            </div>
            {children}
        </div>
    );
};

export default inject('root')(observer(App));
