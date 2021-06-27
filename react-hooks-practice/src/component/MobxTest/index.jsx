import React from 'react';
import {
    useObserver,
    useLocalObservable,
} from 'mobx-react';
// import {autorun,reaction} from 'mobx';

const MobxTest = () => {

    //组件内状态管理 mobx
    //类似useState(() => observable({key:'value'}))
    const store = useLocalObservable(() => ({
        count:0,
        x:0,
        addCount:() => {
            store.count ++;
        }
    }));

    // autorun(()=>{
    //     console.log(`count change: ${store.count}`);
    // })
    //
    //
    // reaction(() => store.count,()=>{
    //     console.log(`x change`);
    // })


    //返回一个监测更改状态的组件
    return useObserver(() => (
        <div>
            <h1>使用mobx hooks测试状态管理</h1>
            <p>
                Count:{store.count}
            </p>
            <button onClick={store.addCount}>
                加一
            </button>
        </div>
    ));
};

export default MobxTest;
