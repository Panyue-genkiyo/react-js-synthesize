import React, {useState} from 'react';
import {Menu,Button,DatePicker,Upload,Avatar, Badge,Modal,Progress,Spin,Skeleton,Empty} from 'antd';
import  {WechatOutlined, SearchOutlined, UploadOutlined,UserOutlined,MessageOutlined, LoadingOutlined,AppstoreOutlined ,SettingOutlined,MailOutlined,createFromIconfontCN } from '@ant-design/icons';
import 'antd/dist/antd.css';//引入antd样式
//按需引入ui组件
import PgBasic from "./compontent/PgBasic";

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
        '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js',
        '//at.alicdn.com/t/font_2539258_yxjrspbkt7.js',
    ],
});


function App(){
        const {SubMenu} = Menu;
        const {RangePicker} = DatePicker;
        const [isModalVisible, setIsModalVisible] = useState(false);
        const Icons = <LoadingOutlined style={{fontSize: 50,color:'skyblue'}} spin/>;
        const onChange = (date, dateString) =>  {
        console.log(date, dateString);
        }

        const handleClick = (e) => {
            console.log('click',e);
        }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
        return (
            <div className="icons-list">
                App...
                {/*主按钮*/}
                <Button type="primary">Primary Button</Button>
                {/*默认按钮*/}
                {/*不写type属性就是default*/}
                <Button>按钮一</Button>
                {/*链接*/}
                <Button type='link'>按钮二</Button>
                <WechatOutlined  style={{color:'pink',fontSize:30}}/>
                <Button type="primary" icon={<SearchOutlined />}>
                    Search
                </Button>
                <DatePicker onChange={onChange} />
                <RangePicker showTime/>
                <Upload>
                    <Button type={'primary'} icon={<UploadOutlined/>} size={'large'}>Update</Button>
                </Upload>
                <div>
                    <Badge dot>
                      <Avatar icon={<UserOutlined/>} size={'media'}/>
                    </Badge>
                </div>
                <Button type={'primary'} icon={<MessageOutlined />} size={'large'} onClick={showModal}>
                    Message
                </Button>
                <Modal title={'basic model'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                <Progress type={'circle'} percent={75} status={'exception'} width={80}/>
                <div style={{width:170}}>
                    <Progress percent={'50'} status={'active'} width={170}/>
                </div>
                <PgBasic/>
                <Spin indicator={Icons}/>
                <Skeleton avatar paragraph={{ rows: 4 }} active/>
                <Menu
                    onClick={handleClick}
                    style={{ width: 256 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    <SubMenu key="sub1" icon={<MailOutlined />} title="学习数学">
                        <Menu.ItemGroup key="g1" title="Item 1">
                            <Menu.Item key="1">Option 1</Menu.Item>
                            <Menu.Item key="2">Option 2</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup key="g2" title="Item 2">
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </Menu>
                <Menu mode="inline" style={{width:256}}>
                    <SubMenu key='sub5' title='Program Language' icon={<IconFont type={'iconheart'} />}>
                        <Menu.Item key='13'>Java</Menu.Item>
                        <Menu.Item key='14'>Cpp</Menu.Item>
                    </SubMenu>
                </Menu>
                <Empty/>
            </div>
        );
}

export default App;
