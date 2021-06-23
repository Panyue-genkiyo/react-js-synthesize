import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  render() {
    return (
        <div>
           <button onClick={this.getStudentData}>点我获取学生数据</button>
            <button onClick={this.getCarData}>点我获取汽车数据</button>
        </div>
    );
  }

    getStudentData = () => {
      //给中间的代理服务器发送请求，解决请求同源跨域的问题,注意要在package.json中配置proxy:它里面写上目标服务器的地址
        //如果本地服务器3000存在相应资源，则我就不需要再请求外置服务器了，3000没有就转发给5000
      axios.get('http://localhost:3000/api1/students').then(
        response =>{
           console.log('成功了',response.data);
        },
        error => {
            console.log('失败了',error);
        }
      );
    }
    //如果你此时是从多个服务器那边拿数据，此时就不需要在package.json中配置了
    getCarData = () => {
      axios.get('http://localhost:3000/api2/cars').then(
          res => {
              console.log('成功了',res.data);
          },
          error => {
              console.log('失败了',error);
          }
      )
    }
}

export default App;
