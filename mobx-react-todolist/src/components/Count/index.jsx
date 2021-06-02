import React from 'react';
import {inject,observer} from 'mobx-react'

//已完成

const Count = ({count}) => {
    // console.log(count);
    // window.count = count;
    return (
        <div>
          Count:{count.count}
          <button onClick={() => {count.addOne()}}>点我加一</button>
          <button onClick={() => {count.minsOne()}}>点我减一</button>
        </div>
    );
};



export default inject("count")(observer(Count))
//inject("count")(observer(Count));
