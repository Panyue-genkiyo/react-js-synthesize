import React, {Component} from 'react';
import './index.css'


export class List extends Component {

    render() {
        //注意错误对象error不能作为react的子节点
        //在app状态中存数据的时候要存放错误的信息
        const {users,isFirst,isLoading,err} = this.props;
        return (
            <div>
                <div className="row">
                    {
                        isFirst ? <h2>please input the username and search users</h2>
                                : isLoading ? <h2>Loading...</h2>
                                : err ? <h2 style={{color:'red'}}>{err}</h2>
                                : users.map(userObj => {
                                    return (
                                       <div key={userObj.id} className="card">
                                         <a rel='noreferrer' href={userObj.html_url } target="_blank">
                                            <img alt="head_portrait" src={userObj.avatar_url}
                                             style={{width: '100px'}}/>
                                          </a>
                                          <p className="card-text">{userObj.login}</p>
                                       </div>
                                   );
                                })
                    }
                </div>
            </div>
        );
    }
}
