import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import axios from "axios";
import {Button, Form, Input, InputNumber, Select} from "antd";
import {inject, observer} from 'mobx-react';
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

const {Option} = Select;

const EditBook = ({books,categorys,app}) => {

    const location = useLocation();
    const record = JSON.parse(location.state);
    console.log(record)

    const {loadData,setIsLoading,searchBooks,deleteSearchBooks,isShow,setIsShow} = books;

    const history = useHistory();

    const {setCurrent} = app;

    useEffect(()=> {
        axios.get('/api1/book/all')
            .then((res) => {
                loadData(res.data);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading();
            });
        axios.get('/api1/category/all')
            .then((res) => {
                categorys.loadData(res.data);
            })
            .catch((err) => {
                console.log(err);
                categorys.setIsLoading();
            });

    },[books, categorys, loadData, setIsLoading])

    console.log(categorys);

    const onFinish = (values) => {
        console.log('Success:', values);
        if(values.name.indexOf("[") !== -1 || values.name.indexOf("]") !== -1){
            values.name = values.name.replaceAll("[","%5B");
            values.name = values.name.replaceAll("]","%5D");
        }
        if(!+values.category) {
            let name = values.category;
            values.category = categorys.categorys.find((c) => c.name === name).id;
        }
        axios.get("/api1/book/change",{
            params:values,
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
                    history.push('/books');
                    setCurrent('books');
                    if(searchBooks.length) deleteSearchBooks();
                    if(isShow) setIsShow();
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
        let l = books.books.some(b => b.name === value && value !== record.name)
        return new Promise((resolve,reject)=>{
            l?reject(new Error('该图书已存在')):resolve();
        })
    }

    const checkIFHasIsbn = (_,value) => {
        let l = books.books.some(b => b.isbn === value && value !== record.isbn)
        return new Promise((resolve,reject)=>{
            l?reject(new Error('isbn号不能重复')):resolve();
        })
    }

    //只允许用户按指定的字符格式输入
    // const checkValue = (_,value) => {
    //     let test = /^[\u4e00-\u9fa5()（）a-zA-Z0-9_-]{0,20}$/
    //     let l = test.test(value);
    //     return new Promise((resolve,reject)=>{
    //         !l?reject(new Error('书名只能包含汉字,大小写字母,下划线,中顿号(_),括号或者数字,且最多20位')):resolve();
    //     })
    // }

    return(
        <Form
            {...layout}
            name="basic"
            form={form}
            initialValues={{
                remember: true,
                id:record.id,
                name:record.name,
                isbn:record.isbn,
                author:record.author,
                publish:record.publish,
                price:record.price,
                category:record.category.name
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{marginTop:'30px'}}
        >
            <Form.Item
                label="图书ID"
                name="id"
            >
                <InputNumber disabled/>
            </Form.Item>

            <Form.Item
                label="修改后的图书的书名"
                name="name"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请输入修改之后的图书名',
                    },
                    {
                        validator:async (_,value)=> {
                            await checkIFHasName(_,value);
                            // await checkValue(_,value);
                        }
                    }
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="修改后的图书的isbn号"
                name="isbn"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请输入修改之后的isbn号',
                    },
                    {
                        validator:async (_,value)=> {
                            await checkIFHasIsbn(_,value);
                        }
                    }
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="修改后的图书的作者"
                name="author"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请输入修改之后的作者',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="修改后的图书出版社的名称"
                name="publish"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请输入修改的出版社名称',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="修改后的图书价格"
                name="price"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请输入修改后的图书价格',
                    },
                ]}
            >
                <InputNumber min={0} step={0.5}/>
            </Form.Item>

            <Form.Item
                label="修改后的图书分类"
                name="category"
                rules={[
                    {
                        required: true,
                        message: '请选择修改后的图书分类',
                    },
                ]}
            >
                <Select style={{ width: 120 }}>
                    {categorys.categorys.map(c => (
                        <Option key={c.id}>{c.name}</Option>
                    ))}
                </Select>
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

export default inject('books','categorys')(observer(EditBook));
