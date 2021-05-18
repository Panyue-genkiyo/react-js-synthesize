//脚手架
//这种写法不是解构赋值，而是代表这个文件使用多重暴露的手段
import React,{Component} from "react";
import Hello from './components/hello/Hello'


class App extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default App;

class App extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default App;
//创建并暴露外壳组件
export default class App extends Component{
    render() {
        return(
            <div>
                <Hello/>
            </div>
        )
    }
}
//暴露app组件
// export default App;
