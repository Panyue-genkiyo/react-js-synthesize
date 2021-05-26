import React, {Component} from 'react';
import axios from "axios";


class Search extends Component {
    render() {
        return (
            <div>
                <section className="jumbotron">
                    <h3 className="jumbotron-heading">Search Github Users</h3>
                    <div>
                        <input ref={(c)=> this.searchKeyword = c } type="text" placeholder="enter the name you search"/>&nbsp;
                        <button onClick={this.handleSearch}>Search</button>
                    </div>
                </section>
            </div>
        );
    }

    handleSearch = () => {
        //获取用户输入
        //连续解构复制的写法
        const {searchKeyword:{value:keyword}} = this;
        const {updateAppState} = this.props;
        //发送请求前通知app更新状态
        updateAppState({isFirst:false,isLoading: true});
        // console.log(searchKeyword);//此时将会产生错误，错误原因，searchKeyword为定义
        //发送网络请求
        axios.get(`/api1/search/users?q=${keyword}
`,).then(
            response => {
                //当数据成功接收到之后再次通知app更新状态
                const {updateAppState} = this.props;
                updateAppState({users: response.data.items,isLoading: false});//传递给users的信息,改变父组件的状态
            },
            error => {
                //当请求失败后通知app保存出错信息
                const {updateAppState} = this.props;
                updateAppState({isLoading: false,err: "Sorry,we can't find resource you want,status code:404"});
            }
        );
    }
}

export default Search;
