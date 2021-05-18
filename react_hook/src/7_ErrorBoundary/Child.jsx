import React,{Component} from "react";

class Child extends Component {

    state = {
        // users:[
        //     {id:'001',name:'Tom',age:18},
        //     {id:'002',name:'Jack',age:19},
        //     {id:'003',name:'Mary',age:20}
        // ],
        users:'abc',
    }

    render() {
        return (
            <div>
                <h2>我是child组件</h2>
                {/*错误边界把错误控制在子组件中*/}
                {
                    this.state.users.map(user=>{
                        return <h4 key={user.id}>{user.name}----{user.age}</h4>
                    })
                }
            </div>
        );
    }
}


export default Child;
