import React, {useEffect, useState} from 'react';

const EffectTest = () => {

    console.log('effectTest render')

    const [showList,setShowList] = useState(false);
    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(true);
    //初始化加载post数为5条
    const [count,setCount] = useState(5);

    //钩子useEffect
    //异步钩子，不影响页面加载
    useEffect(() => {
        const load = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await res.json();
            setPosts(data);
            setLoading(false);
        }
        load();
        return () => {
            console.log('这里处理上一个render')
        }
    },[count])

    return (
        <div>
            <button onClick={()=>{setShowList(!showList)}}>
                {showList ? '隐藏' : '显示'}
            </button>
            {showList  && <button onClick={()=>{setCount(count => count + 5)}}>
                增加5条数据
            </button>}
            <div>
                {showList && (loading?<p>loading...</p>: <PostList posts={posts} count={count}/>)}
            </div>
        </div>
    );
};

const PostList = ({posts,count}) => {

    console.log('postList render');

     return (
         <div>
             <ul>
                 {posts.slice(0,count).map(post => (
                      <li key={post.id}>
                          {post.body}
                      </li>
                 ))}
             </ul>
         </div>
     )
}

export default EffectTest;
