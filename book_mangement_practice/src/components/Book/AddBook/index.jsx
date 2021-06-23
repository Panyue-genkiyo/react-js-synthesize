import React,{useEffect} from 'react';
import {inject,observer} from 'mobx-react';
import {Form, Input, Button, InputNumber,Select} from 'antd';
import {useHistory} from 'react-router-dom';
import  axios from 'axios';
import Swal from 'sweetalert2';

const {Option} = Select;

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


const AddBook = ({books,categorys,app}) => {

    const {loadData,bookId,setIsLoading} = books;
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

    const onFinish = (values) => {
        console.log('Success:', values);
        //转码
        if(values.name.indexOf("[") !== -1 || values.name.indexOf("]") !== -1){
            values.name = values.name.replaceAll("[","%5B");
            values.name = values.name.replaceAll("]","%5D");
        }
        axios.get('/api1/book/addBook',{
            params:values,
        }).then(res=>{
            //跳转
            Swal.fire({
                title:"添加成功",
                icon:'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: '确定'
            }).then(()=>{
                setTimeout(()=>{
                    history.push('/books');
                    setCurrent('books');
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
        let l = bookId.some(id => id === value)
        return new Promise((resolve,reject)=>{
            l?reject(new Error('已存在该bookId')):resolve();
        })
    }

    const checkIFHasIb8n = (_,value) => {
        let l = books.books.some( b => b.isbn === value)
        return new Promise((resolve,reject)=>{
            l?reject(new Error('该isbn号已存在')):resolve();
        })
    }

    const checkIFHasName = (_,value) => {
        let l = books.books.some( b => b.name === value)
        return new Promise((resolve,reject)=>{
            l?reject(new Error('该书名已存在')):resolve();
        })
    }

    //只允许用户按指定的字符格式输入
    //  const checkValue = (_,value) => {
    //      let test = /^[\u4e00-\u9fa5()（）a-zA-Z0-9_-]{0,20}$/
    //      let l = test.test(value);
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
                category:"请选择"
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{marginTop:'30px'}}
        >
            <Form.Item
                label="ID"
                name="id"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请输入id',
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
                label="isbn编号"
                name="isbn"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请输入isbn',
                    },
                    {
                        validator:async (_,value)=> {
                            await checkIFHasIb8n(_,value);
                        }
                    }
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="名称"
                name="name"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请输入名称',
                    },
                    {
                        validator:async (_,value)=> {
                            await checkIFHasName(_,value);
                            // await checkValue(_,value);
                        }
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="作者"
                name="author"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请输入作者姓名',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="出版社"
                name="publish"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请输入出版社名称',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="价格"
                name="price"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请输入价格',
                    },
                ]}
            >
                <InputNumber min={0} step={0.5}/>
            </Form.Item>

            <Form.Item
                label="分类"
                name="category"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请选择分类',
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

export default inject('books','categorys')(observer(AddBook));
