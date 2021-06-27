import React, {useEffect} from 'react';
import  {useLocalObservable,useObserver} from 'mobx-react';


const Example2 = () => {

    const store = useLocalObservable(() => ({
       timer : 0,
       addTimer(){
           setInterval(()=>{
               store.timer ++;
           },1000);
       },
        reset(){
          store.timer = 0;
        }
    }));

    //组件加载钩子
    useEffect(() => {
        store.addTimer();
    },[store]);

    return (
        <div>
            {useObserver(()=> <button onClick={store.reset}>Second pass : {store.timer}</button> )}
        </div>
    );
}

export default Example2;
