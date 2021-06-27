import React, {useState,useCallback,useEffect} from 'react';

//person组件
const Person = ({fetchData}) => {

    const [loading,setLoading] = useState(true);

    const [person,setPerson] = useState({});

    useEffect(()=>{
        fetchData().then(
            res => res.json()
        ).then(
            data => {
                setPerson(data);
                setLoading(false);
            }
        )
    },[fetchData]);

    if(loading){
        return <p>loading....</p>
    }

    return (
        <div>
           <p>id:{person.id}</p>
           <p>name:{person.name}</p>
           <p>email:{person.email}</p>
           <p>website:{person.website}</p>
        </div>
    )
}

const TestUseCall = () => {

    const [id,setId] = useState(1);

    const fetchData = useCallback(()=>{
        return  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    },[id]);

    return (
        <div>
           <Person fetchData={fetchData}/>
           <button onClick={()=>{
               setId((id) => {
                   if(id < 10) return id + 1;
                   else if(id >= 10) return 1;
               })
           }}>
               点我查看下一个用户的信息(默认只有十个用户)
           </button>
        </div>
    );

};

export default TestUseCall;
