import React, {useEffect,useState} from 'react';
import {inject,observer} from 'mobx-react';
import {Table,Space,Button} from 'antd';
import {LoadingOutlined} from '@ant-design/icons'
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import Swal from "sweetalert2";


const Category = ({categorys,books,app}) => {

    const datasource = categorys.categorys;

    const history = useHistory();

    const {loadData,setIsLoading,isLoading} = categorys;

    const [flag,setFlag] = useState(true);

    const {setCurrent} = app;

    useEffect(() => {
        axios.get('/api1/category/all')
            .then((res) => {
                loadData(res.data);
            })
            .catch((err) => {
                console.log(err);
                if(isLoading){
                    setIsLoading();
                }
            });
    },[isLoading,flag,categorys,loadData, setIsLoading]);



    const checkIfDeletable = (id) => {
        let sa = books.books;
        if( sa[0] && !sa[0].category ) sa = books.saveBooks;
        return !sa.some(b => {
           return b.category.id === id
        })
    }

    const  pagination = {
        total: datasource.length,
        pageSize:5,
    };

    const columns = [
        {
            title: '类别ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '类别名称',
            dataIndex: 'name',
            key:'name'
        },

        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="small">
                    <Button key={'edit'} onClick={()=>{
                        let record1 = JSON.stringify(record);
                        history.push({
                            pathname:'/categorys/ed',
                            state:record1,
                        });
                    }}  type="primary">编辑</Button>
                    {checkIfDeletable(record.id)?
                        <Button key={'delete'} type="primary" onClick={() => {
                            Swal.fire({
                                title: `确定删除分类${record.name}吗？`,
                                text: '你将无法恢复它！',
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: '确定删除！',
                            }).then(willDelete => {
                                if (willDelete.isConfirmed) {
                                    console.log(willDelete);
                                    axios.get('/api1/category/delete', {
                                        params: {
                                            id: record.id,
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
                                                    history.push('/categorys')
                                                    setFlag(!flag);
                                                    setCurrent('categorys');
                                                },500)
                                            })
                                        }
                                    ).catch((err) => {
                                        console.log(err);
                                    })
                                }
                                else{
                                    history.push("/categorys");
                                }
                            })
                                .catch(err=>{
                                    console.log(err);
                                })
                        }} danger>删除</Button> :
                        <Button key={'delete'} type="primary" disabled danger>删除</Button>
                    }
                </Space>
            )
        }
    ];

    return (
        <div>
            {categorys.isLoading ? <LoadingOutlined/> : <Table dataSource={datasource} pagination={pagination} rowKey={record => record.id} columns={columns}/>}
        </div>
    );
}

export default inject(
    'categorys','books'
)(observer(Category));
