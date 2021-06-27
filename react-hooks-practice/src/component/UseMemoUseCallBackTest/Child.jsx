import React,{memo} from "react";

const Child = memo(({clickChild}) => {
    // console.log('child render');
    return <button onClick={clickChild}>
        click child
    </button>
});


export default Child;
