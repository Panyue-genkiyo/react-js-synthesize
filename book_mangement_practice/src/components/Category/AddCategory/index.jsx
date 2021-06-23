import React from 'react';
import {inject,observer} from 'mobx-react';
import {Form, Input, Button, InputNumber} from 'antd';
import {useHistory} from 'react-router-dom';
import {useEffect} from "react";
import  axios from 'axios';
import Swal from 'sweetalert2';

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 16,
    },
};

const AddCategory = ({categorys,app}) => {

    const {loadData,categoryId,setIsLoading} = categorys;

    const history = useHistory();

    const {setCurrent} = app;

    useEffect(()=> {
        axios.get('/api1/category/all')
            .then((res) => {
                loadData(res.data);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading();
            });
    },[categorys,loadData, setIsLoading])

    const onFinish = (values) => {
        console.log('Success:', values);
         if(values.name.indexOf('[') !== -1 || values.name.indexOf(']') !== -1){
             //转码
             values.name = values.name.replaceAll('[','%5B');
             values.name = values.name.replaceAll(']',"%5D");
         }
         axios.get('/api1/category/add',{
            params:{
                id:values.id,
                name:values.name
            }
        }).then(res=>{
            //跳转
            Swal.fire({
                title:"添加成功",
                icon:'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: '确定'
            }).then(()=>{
                 setTimeout(()=>{
                     history.push('/categorys');
                     setCurrent('categorys');
                 },500)
            })
         })
             .catch((err)=>{console.log(err)})
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();


    const onReset = () => {
        form.resetFields();
    };

    const checkIFHasId =  (_,value) => {
        let l = categoryId.some(id => id === value)
        return new Promise((resolve,reject)=>{
            l?reject(new Error('已存在该id')):resolve();
        })
    }

    const checkIFHasName = (_,value) => {
        let l = categorys.categorys.some(c => c.name === value)
        return new Promise((resolve,reject)=>{
            l?reject(new Error('已存在该分类名')):resolve();
        })
    }


    return(
        <Form
            {...layout}
            name="basic"
            form={form}
            initialValues={{
                remember: true,
                // username:record.username
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{marginTop:'30px'}}
        >
            <Form.Item
                label="类别ID"
                name="id"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请输入类别id',
                    },
                    {
                        validator:async (_,value)=> {
                           await checkIFHasId(_,value);
                        }
                    }
                ]}
            >
                <InputNumber min={0}/>
            </Form.Item>
            <Form.Item
                label="类别的名称"
                name="name"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请输入类别名称',
                    },
                    {
                        validator:async (_,value)=> {
                            await checkIFHasName(_,value);
                        }
                    }
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" style={{marginRight:'10px'}}>
                        添加
                    </Button>
                    <Button danger type='primary' htmlType="button" onClick={onReset}>
                        重置
                    </Button>
                </Form.Item>
            </Form.Item>
        </Form>
    )
};

export default inject('categorys')(observer(AddCategory));
