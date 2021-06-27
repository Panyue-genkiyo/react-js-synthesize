import React from 'react';
import Count from "./component/Count";
import TodoList from "./component/TodoList";
import HookTest from "./component/HookTest";
import Parent from "./component/UseMemoUseCallBackTest/Parent";
import EffectTest from "./component/UseEffectTest";
import Test from "./component/UseEffectTest/Test";
import TestUseEffect from "./component/UseEffectTest/TestUseEffect";
import TestUseCallBack from "./component/UseEffectTest/TestUseCallBack";
import TestUseState ,{TestUseStateByRef} from "./component/UseEffectTest/TestUseState";
import UseMyHook from "./component/UseEffectTest/TestUseMyHook";
import MobxTest from "./component/MobxTest";
import Example from "./component/MobxReactHooksExample/Example";
import Example2 from "./component/MobxReactHooksExample/Example2";

const App = () => {
    return (
        <div>
            <HookTest/>
            <hr/>
            <Count/>
            <hr/>
            <TodoList/>
            <hr/>
            <Parent/>
            <hr/>
            <EffectTest/>
            <hr/>
            <Test/>
            <hr/>
            <TestUseEffect/>
            <hr/>
            <TestUseCallBack/>
            <hr/>
            <TestUseState/>
            <hr/>
            <TestUseStateByRef/>
            <hr/>
            <UseMyHook/>
            <hr/>
            <MobxTest/>
                <hr/>
                <Example/>
                <hr/>
                {/*<Example2/>*/}
        </div>
    );
};

export default App;
