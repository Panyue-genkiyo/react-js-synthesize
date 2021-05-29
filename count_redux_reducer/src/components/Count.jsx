import React, {Component} from 'react';

import {connect} from "react-redux";

import {increment,asyncIncrement} from '../redux/action/count'
import {reducer} from "../redux/reducer/count";
/*import {asyncIncrement,increment} from '../redux/action/count'*/

// import {reducer} from '../redux/reducer/count';
//
// import {INCREMENT} from '../redux/constant'

//useReducer


// const Count = () => {
//
//     const [state,dispatch] = useReducer(reducer);
//
//     return (
//         <div>
//             <h1>现在count为:{state.count}</h1>
//             <button onClick={dispatch({type:INCREMENT,playLoad:3})}>点我加三</button>
//         </div>
//     );
// };


// const Count = () => {
//
//     const [state,dispatch] = useReducer(reducer);
//
//     return (
//         <div>
//             <h1>现在count为:{state.count}</h1>
//             <button onClick={dispatch(increment)}>点我加三</button>
//             <button onClick={dispatch(asyncIncrement)}>点我异步加三</button>
//         </div>
//     );
// };
//
// export default Count;



class Count extends Component {

    addThree = () => {
        this.props.increment(3);
    }

    anyscAddThree = () => {
        this.props.asyncIncrement(3);
    }

    render() {
        return (
            <div>
                <h1>现在count为:{this.props.count}</h1>
                <button onClick={this.addThree}>点我加三</button>
                <button onClick={this.anyscAddThree}>点我异步加三</button>
            </div>
        );
    }
}


export default connect(
    (state)=>({count:state.count}),
    {
        increment,
        asyncIncrement
    }
)(Count);
