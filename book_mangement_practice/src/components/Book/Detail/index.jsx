import React, {useEffect,useState} from 'react';
import {inject,observer} from 'mobx-react';
import {Table,Space,Button} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import axios from 'axios';
import Swal from "sweetalert2";
import {useHistory} from 'react-router-dom';

const Book = ({books,app}) => {

    const {loadData,setIsLoading,setSaveBooks,saveBooks,searchBooks,deleteSearchBooks,isShow,setIsShow} = books;

    const [flag,setFlag] = useState(true);

    const {setCurrent} = app;

    const history = useHistory();

    let datasource = books.books;

    useEffect(() => {
        axios.get('/api1/book/all')
            .then((res) => {
                loadData(res.data);
                setSaveBooks();
            })
            .catch((err) => {
                console.log(err);
                if(books.isLoading){
                    setIsLoading();
                }
            })
    },[flag, books, loadData, setIsLoading, setSaveBooks]);

    // console.log(books);

    const deleteBook = (record) => {
        Swal.fire({
            title: `确定删除图书${record.name}吗？`,
            text: '你将无法恢复它！',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `确定删除！`,
        }).then(willDelete => {
            if (willDelete.isConfirmed) {
                axios.get('/api1/book/delete', {
                    params: {
                        name: record.name,
                    }
                }).then(
                    (res) => {
                        Swal.fire({
                            title:"删除成功",
                            icon:'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: '确定'
                        }).then(()=>{
                            setTimeout(()=>{
                                history.push('/books')
                                setFlag(!flag);
                                setCurrent('books');
                                if(searchBooks.length) deleteSearchBooks();
                                if(isShow) setIsShow();
                            },500)
                        })
                    }
                ).catch((err) => {
                    console.log(err);
                })
            }
            else{
                history.push("/books");
                if(searchBooks.length) deleteSearchBooks();
            }
        })
            .catch(err=>{
                console.log(err);
            })
    }

    const editBook = (record) => {
        history.push({
            pathname:'/books/ed',
            state:JSON.stringify(record),
        });
    }

    const  pagination = {
        total: datasource.length,
        pageSize:5,
    };

    const  paginationSea = {
        total: searchBooks.length,
        pageSize:5,
    };


    const columns = [
        {
            title: '图书ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '图书isbn号',
            dataIndex: 'isbn',
            key:'isbn',
        },
        {
          title: '图书名称',
          dataIndex: 'name',
          key:'name'
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: '出版社',
            dataIndex: 'publish',
            key: 'publish',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            render:(text,record) => {
                return <>¥{text}</>
            }
        },
        {
            title:'类别',
            dataIndex: 'category',
            key:'category',
            render:(text,record) => {
                return <>{record.category.name}</>
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) =>(
                <Space size="small">
                    <Button key={'edit'} onClick={() => {editBook(record)}} type="primary">编辑</Button>
                    <Button key={'delete'} onClick={() => deleteBook(record)} type="primary" danger>删除</Button>
                </Space>
            )
        },

    ];

    return (
        <div>
            {books.isLoading ? <LoadingOutlined/> : (searchBooks.length ? <Table dataSource={searchBooks} pagination={paginationSea} rowKey={record => record.id} columns={columns}/> :
                (isShow ?<Table pagination={paginationSea} dataSource={searchBooks}  rowKey={record=>record.id} columns={columns}/> : <Table  dataSource={datasource[0]? (!datasource[0].category ? saveBooks : datasource):datasource} pagination={pagination} rowKey={record=>record.id} columns={columns}/>))}
        </div>
    );
};

export default inject('books')(observer(Book));
