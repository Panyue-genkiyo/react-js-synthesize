import React, { Component } from 'react';

class News extends Component {

    //开启定时器
    componentDidMount() {
        // setTimeout(()=>{
        //     this.props.history.push('/home/message');//push操作跳转
        // },2000)
    }

    render() {
        return (
         <ul>
            <li>news001</li>
            <li>news002</li>
            <li>news003</li>
         </ul>
      );
    }
}

export default  News;
