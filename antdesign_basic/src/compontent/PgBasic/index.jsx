import React, {Component} from 'react';
import {Progress,Button} from "antd";
import {MinusOutlined, PlusOutlined} from  '@ant-design/icons';
import 'antd/dist/antd.css'

class PgBasic extends Component {

    state = {
        percent:0,
    }

    increase = () => {
        let {percent} = this.state;
        percent += 10;
        if(percent > 100) percent = 100;
        this.setState({percent});
    }

    decrease = () => {
        let {percent} = this.state;
        percent -= 10;
        if(percent < 0) percent = 0;
        this.setState({percent});
    }


    render() {
        const {percent}  = this.state;
        return (
            <div>
               <Progress type={'circle'} format={(percent)=>{
                   if(percent === 100)  return 'Done';
                   return `${percent} days`;
               }} percent={percent} strokeColor={{
                   //渐变色
                   '0%': '#108ee9',
                   '100%': '#87d068'
               }}/>
                <Button.Group>
                    <Button onClick={this.increase} icon={<PlusOutlined/>}/>
                    <Button onClick={this.decrease} icon={<MinusOutlined/>}/>
                </Button.Group>
            </div>
        );
    }
}

export default PgBasic;
