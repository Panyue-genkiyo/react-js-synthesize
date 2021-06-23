import React,{Component}  from 'react';
import {connect} from "react-redux";
import {increment,asyncIncrement} from '../redux/reducer/count';
import store from '../redux/store';


class Count extends Component {
    render() {
        return (
            <div>
                <h1>Count:{this.props.count}</h1>
                <button onClick={() => {store.dispatch(increment(1))}}>加一</button>
                <button onClick={() => {store.dispatch(asyncIncrement(1))}}>异步加一</button>
                <h1>
                    人员信息
                </h1>
                <ul>
                    {this.props.persons.map(person => (
                        <li key={person.id}>
                            <p>name:{person.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}



export default connect(
    (state) => ({count: state.count.count,persons:state.person.persons}),
    {
        increment,
        asyncIncrement
})(Count);


