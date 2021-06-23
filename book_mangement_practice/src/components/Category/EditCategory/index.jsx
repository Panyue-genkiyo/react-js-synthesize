import React, {useEffect} from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import axios from "axios";
import {Button, Form, Input, InputNumber} from "antd";
import {inject,observer} from 'mobx-react';
import Swal from "sweetalert2";


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


const EditCategory = ({categorys,app}) => {
    const location = useLocation();
    const record = JSON.parse(location.state);
    console.log(record)

    const {loadData,setIsLoading} = categorys;

    const history = useHistory();


    useEffect(()=>{
        axios.get('/api1/category/all')
            .then((res) => {
                loadData(res.data);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading();
            });
    },[categorys,loadData,setIsLoading])

    const onFinish = (values) => {
        console.log('Success:', values);
        if(values.name.indexOf('[') !== -1 || values.name.indexOf(']') !== -1){
            //转码
            values.name = values.name.replaceAll('[','%5B');
            values.name = values.name.replaceAll(']',"%5D");
        }
        axios.get("/api1/category/change",{
            params:{
                id:values.id,
                name:values.name
            }
        }).then(res=>{
            console.log(res);
            //跳转
            Swal.fire({
                title:"修改成功",
                icon:'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: '确定'
            }).then(()=>{
                setTimeout(()=>{
                    history.push('/categorys')
                    app.setCurrent('categorys');
                },500);
            })
        })
            .catch(err=>console.log(err));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };


    const checkIFHasName = (_,value) => {
        let l = categorys.categorys.some(c => c.name === value && value !== record.name)
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
                    id:record.id,
                    name:record.name
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{marginTop:'30px'}}
            >
                <Form.Item
                    label="类别ID"
                    name="id"
                >
                    <InputNumber disabled/>
                </Form.Item>
                <Form.Item
                    label="修改的类别的名称"
                    name="name"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请输入修改之后的类别名',
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
                            修改
                        </Button>
                        <Button danger type='primary' htmlType="button" onClick={onReset}>
                            重置
                        </Button>
                    </Form.Item>
                </Form.Item>
            </Form>
    )
};

export default inject('categorys')(observer(EditCategory));
