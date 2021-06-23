import React ,{useRef,useEffect} from 'react';
import {inject,observer} from "mobx-react";
import {useHistory} from 'react-router-dom';
import {Input,InputNumber,Select,Button, Tooltip,Form} from 'antd';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';

const {Search} = Input;
const {Option} = Select;

const tailLayout = {
    wrapperCol: {
        offset: 2,
        span: 16,
    },
};

const SearchA = ({books,searchs,app,categorys}) => {

    const searchInput = useRef(null);

    const {value,setSelectValue,selectValue,minValue,maxValue,setMinValue,setMaxValue,flag,setFlag} = searchs;

    const history = useHistory();

    const {loadSearchBooks,isShow,setIsShow} = books;

    const {current,setCurrent} = app;

    const {loadData,setIsLoading} = categorys;

    const getBooksData = (url,params) => {
        axios.get(url,{
            params
        }).then(
            res=>{
                loadSearchBooks(res.data);
            }
        )
            .catch(error=>{
                console.log(error);
            });
        if(!isShow) setIsShow();
        setCurrent('books');
        if(current === 'books') {
            history.push('/books')
        }
        searchInput.current.state.value = value;
    }


    const onSearch = name => {
        console.log(name);
        if(name.indexOf('[') !== -1 || name.indexOf(']') !== -1){
            //请求一般不能传递特殊字符
            name = name.replaceAll('[','%5B');//转码
            name = name.replaceAll(']','%5D');//转码
        }
        getBooksData('/api1/book/searchBooks',{
            name
        })
    }

    useEffect(() => {
        console.log(searchInput);
        searchInput.current.onBlur = (e) => {
            e.target.value = '';
        }
        searchInput.current.onFocus = (e) => {
            e.target.value = '';
        }
        axios.get('/api1/category/all')
            .then((res) => {
                loadData(res.data);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading();
            });
    },[loadData,setIsLoading]);

    const handleSelectChange = (value) => {
        console.log(value);
        setSelectValue(value);
    }

    const searchByCategory = (e) => {
        console.log(e);
       console.log(selectValue);
       //发送请求
        if(flag) setFlag();
       if(selectValue) {
           getBooksData('/api1/book/sebyc', {
               id: selectValue,
           })
       }else{
           setFlag();
       }
       setSelectValue('');
    }

    const onFinish = (value) => {
        console.log(value);
        getBooksData('/api1/book/bp',value);
    }

    const checkPrice = () => {
       return new Promise((resolve, reject) =>{
           minValue > maxValue ? reject("最高筛选值不能比最低筛选值低"):resolve();
       })
    }

    return (
        <div className='px-4 py-6 space-y-4'>
            <div>
                <h1 className='text-xl text-blue-400'>按书名来查询</h1>
                <Search style={{
                    width:"500px",
                }}  ref={searchInput} className='md:w-60' size={'large'}   placeholder="输入要搜索的图书名(注意当键入%时代表搜索全部书籍)" onSearch={onSearch} enterButton />
            </div>
            <div>
                <h1 className='text-xl text-blue-400'>按分类来查询</h1>
                <div className='space-x-4'>
                    <Select onChange={handleSelectChange} required style={{ width: 120 }}>
                        {categorys.categorys.map(c => (
                            <Option key={c.id}>{c.name}</Option>
                        ))}
                    </Select>
                    {flag && <h2 className='text-red-500'>请选择查询的分类</h2>}
                    <Tooltip title="search">
                        <Button type="primary" shape="circle" onClick={searchByCategory} icon={<SearchOutlined />} />
                    </Tooltip>
                </div>
            </div>
            <div>
                <h1 className='text-xl text-blue-400'>按价格范围来查询</h1>
                <div className='space-x-4'>
                    <Form onFinish={onFinish}
                         initialValues={{
                             lowerPrice:50,
                             higherPrice:300
                         }}>
                        <Form.Item
                           label={'最低值'}
                           name={'lowerPrice'}
                           rules={[
                               {
                                   required: true,
                                   message: '请输入最所要筛选的价格的最低值',
                               },
                           ]}
                        >
                            <InputNumber min={0} step={0.5} onChange={(value)=>{
                                console.log(value);
                                setMinValue(value)
                            }}/>
                        </Form.Item>
                        <Form.Item
                            label={'最高值'}
                            name={'higherPrice'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入所要筛选的最高价格',
                                },
                                {
                                    validator:async (_,value) => {
                                       await checkPrice();
                                    }
                                }
                            ]}
                        >
                            <InputNumber min={0} step={0.5} onChange={value => {
                                 console.log(value);
                                 setMaxValue(value);
                            }}/>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Tooltip title="search">
                                <Button type="primary" shape="circle"  htmlType="submit"   icon={<SearchOutlined />} />
                            </Tooltip>
                        </Form.Item>
                    </Form>
                </div>
           </div>
        </div>
    );
};

export default inject('app','categorys')(observer(SearchA));
