import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import Swal from  'sweetalert2';
import axios from "axios";


class Search extends Component {
    render() {
        return (
            <div>
                <section className="jumbotron">
                    <h3 className="jumbotron-heading">Search Github Users</h3>
                    <div>
                        <input ref={(c)=> this.searchKeyword = c } onKeyUp={event => event.keyCode === 13 ? this.handleSearch() : 0} type="text" placeholder="enter the name you search"/>&nbsp;
                        <button onClick={this.handleSearch}>Search</button>
                    </div>
                </section>
            </div>
        );
    }

    handleSearch = () => {
        //获取用户输入
        const {searchKeyword:{value:keyword}} = this;

        if(keyword.trim() === ''){
            Swal.fire({
                icon:'error',
                title:'用户名不能为空'
            });
            return;
        }

        //通知list更新状态
        PubSub.publish('news',{isFirst: false,isLoading: true});

        axios.get(`/api1/search/users?q=${keyword}`).then(
            response => {
                const {items} = response.data;
                PubSub.publish('news',{isLoading: false,users: items});
            },
            error => {
                PubSub.publish('news',{isLoading:false,err:'Sorry,we can\'t find resource you want,status code:404'});
            }
        )

    }
}

export default Search;
