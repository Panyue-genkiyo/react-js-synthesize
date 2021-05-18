import React, {Component} from 'react';
// import Count from './component/Count'
import CountContainer  from './containers/Count';
import PersonContainer from './containers/Person';
// import store from './redux/store';

class App extends Component {

    // showStudent = () => {
    //     axios.get("/api/stu1")
    //         .then(
    //             response => {
    //                 console.log(response);
    //                 const {name,age} = response.data;
    //                 console.log(`name:${name},age:${age}`);
    //             }
    //         )
    //         .catch(
    //             error => {
    //                 console.log(error);
    //             }
    //         )
    // }

    //用redux的理由，
    //1.某个组件的状态，需要让其他组件随时可以拿到(共享)
    //2.一个组件需要改变另一个组件的状态
    //3，总体原则:能不用就不用,如果比较吃力才考虑使用

    render() {
        return (
            <div>
               {/*<Button type="primary" onClick={this.showStudent}>*/}
               {/*    获取数据*/}
               {/*</Button>*/}
               {/* <CountRedux/>*/}
               {/* 上层props传递store给容器组件*/}
                <CountContainer />
                <hr/>
                <PersonContainer/>
            </div>
        );
    }
}

export default App;
