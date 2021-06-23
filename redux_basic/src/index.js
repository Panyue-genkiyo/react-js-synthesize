import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store';
//provider:提供者(拿到store)，把store精准的传递给需要的容器
import {Provider} from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        {/*在你的app里只要有容器需要该store，供应商提供者都会把这个provider传递给相应的容器*/}
        <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

//监测redux中状态的改变，若状态发生改变，则重新渲染App,此时如果你使用了react-redux则代表你可以不用再这里检测了，它自动监测
// store.subscribe(()=>{
//     ReactDOM.render(
//         <React.StrictMode>
//             <App />
//         </React.StrictMode>,
//         document.getElementById('root')
//     );
// });
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

