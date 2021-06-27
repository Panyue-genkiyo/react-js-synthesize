import React,{memo} from 'react';

//优化
const UserInfo = memo(({userInfo,logMessage}) => {

    console.log('UserInfo render');

    const {name,age} = userInfo;

    return (
        <div>
            <p>我叫{name},今年{age}岁</p>
            <p>message:{logMessage()}</p>
        </div>
    );
})

export default UserInfo;
