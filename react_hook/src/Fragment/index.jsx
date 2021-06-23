import {Fragment} from 'react';

//引入fragment

const Demo = () => {
   return (
       //遇到不得不在包div的情况，我们可以使用Fragment标签来骗过react,
       //Fragment标签在编译完成过后会被丢掉，避免老式的div多层嵌套
       //注意Fragment标签只能拥有一个属性就是key，其他属性不行
      // <Fragment>
      //     <input type='text'/>
      //     <input type='text'/>
      // </Fragment>
       //或者<>
       <>
            <input type='text'/>
            <input type='text'/>
       </>
   );
};



export default Demo;
