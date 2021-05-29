import React, {Component} from 'react';
import {nanoid} from 'nanoid';
import {connect} from 'react-redux';
import {addPerson} from '../../redux/actions/person'

class Person extends Component {

    addPerson = () => {
        const {value:name} = this.nameNode;
        const {value:age} = this.ageNode;
        const {addPerson} = this.props;
        //使用nanoid生成唯一id yarn add nanoid
        const personObj = {id:nanoid(),name,age:age * 1};
        // console.log(personObj);
        addPerson(personObj);
        this.nameNode.value = '';
        this.ageNode.value = '';
    }

    render() {
        return (
            <div>
                <h1>我是Person组件,上方组件的求和为:{this.props.count}</h1>
                <input ref={c => this.nameNode = c} type="text" placeholder={'输入一个人的名字'}/>
                <br/>
                <input ref={c => this.ageNode = c} type="text" placeholder={'输入一个人的年龄'}/>
                <br/>
                <button onClick={this.addPerson}>添加</button>
                <ul>
                    {
                        this.props.persons.map((personObj) => {
                           return <li key={personObj.id}>{personObj.name}---{personObj.age}</li>
                         })
                    }
                </ul>
            </div>
        );
    }
}

//编写redux组件

export default connect(
    state => ({
        persons: state.persons,
        count:state.count
    }),//映射状态
    {
        addPerson //action 放在
    }
)(Person);


