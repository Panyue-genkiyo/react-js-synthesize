import React, {useEffect} from 'react';
import {fetchPost} from '../redux/reducer/post';
import {useDispatch, useSelector} from 'react-redux';
import {Descriptions} from 'antd';
import 'antd/dist/antd.css';

const Post = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => ({posts:state.post.posts}));
    // console.log(posts);
    useEffect(() => {
       dispatch(fetchPost());
    },[dispatch])

    return (
        <div>
            <h1>posts</h1>
            <div>
                {posts.posts.map(post => (
                    // <div key={post.id}>
                    //     <h2>{post.userId}---{post.title}</h2>
                    //     <p>{post.body}</p>
                    //     <hr/>
                    // </div>
                    <Descriptions key={post.id} title={post.title} bordered={true}>
                        <Descriptions.Item label={post.userId}>
                            {post.body}
                        </Descriptions.Item>
                    </Descriptions>
                ))}
            </div>
        </div>
    );
};

export default Post;
