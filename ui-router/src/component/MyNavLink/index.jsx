import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class MyNavLink extends Component {
    render() {
        // console.log(this.props);
        // const {title} = this.props;
        // 标签体(children)内容包含在this.props里面
        return (
            <NavLink activeClassName="demo" className="list-group-item" {...this.props}/>
        )
    }
}

export default MyNavLink;
