import React, {Component} from 'react';
import  qs from 'querystring'

const content = [
    {id:'01',content:'hello, my name'},
    {id:'02',content:'what can I do for you'},
    {id:'03',content:'try your best'},
]

class Detail extends Component {
    render() {
        console.log(this.props);
        //解构赋值，拿出params参数
        //params，参数在this.props.match.paramss
        // const {title,id} = this.props.match.params;

        //解构赋值，拿出search参数
        // const {search} = this.props.location;
        // qs.parse;把urlencode参数格式转换为对象形式，stringfy正好相反
        // const {id, title} = qs.parse(search.slice(1));
        // console.log(searchObj);

        //解构赋值，拿出state参数
        const {id,title} = this.props.location.state || {};
        console.log("Detail",this.props);//state参数; 这里如果使用browsw=Router不会丢掉state里面携带的参数，而hashRouter就会丢掉

        // 找出该id的对象
        const newsDetail = content.find((newsDetailObj)=>{
            return newsDetailObj.id === id;
        })
        return (
            <div>
               <ul>
                   <li>id:{newsDetail.id}</li>
                   <li>title:{title}</li>
                   <li>content:{newsDetail.content}</li>
               </ul>
            </div>
        );
    }
}

export default Detail;
