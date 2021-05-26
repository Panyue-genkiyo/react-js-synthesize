import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';//希望一般组件也能用this.props.history
//withRouter专门用来解决在一般组件中使用路由组件的问题

class Header extends Component {
    render() {
        // console.log(`Header组件收到的props为`,this.props);
        console.log(this.props);
        return (
            <div className="page-header">
                <h2>React Router Demo</h2>
                <button onClick={this.go(-1)}>回退</button>&nbsp;
                <button onClick={this.go(1)}>前进</button>
            </div>
        );
    }

    go = (n) => {
        return () => {
            this.props.history.go(n)
        }
    }
}

export default withRouter(Header);//这里Hello组件也能用this.props.history,返回一个新组件
