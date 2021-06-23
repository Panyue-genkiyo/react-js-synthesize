import React from 'react';
// import Count from "./components/Count";
import {inject,observer} from 'mobx-react';
import Todolist from "./components/Todolist";

const App = ({root}) => {
    console.log({root})
    return (
        <div>
          {/*<Count count={root.count}/>*/}
          <Todolist todos={root.todos}/>
        </div>
    );
};

export default inject('root')(observer(App));
