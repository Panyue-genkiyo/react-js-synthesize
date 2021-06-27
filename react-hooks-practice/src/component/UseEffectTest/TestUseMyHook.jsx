import React,{
    useEffect,
    useState,
    useReducer
} from 'react';
import axios from "axios";

//使用redux
const dataFetchReducer = (state,action) => {
    switch (action.type){
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading:true,
                isError:false,
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading:false,
                isError:false,
                data:action.data
            }
        case 'FETCH_ERROR':
            return {
                ...state,
                isLoading:false,
                isError:true,
            }
        default:
            return new Error();
    }
}

//实现自己的hooks
const useDataApi = (initialUrl,initialData) => {
    let didCancel = false; //标识位，保证数据不会从被卸载的组件传来
    const [url,setUrl] = useState('https://hn.algolia.com/api/v1/search?query=redux');

    //使用redux api
    const [state,dispatch] = useReducer(dataFetchReducer,{
        isLoading:false,
        isError:false,
        data:initialData
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({type:'FETCH_INIT'});
            //包裹错误
            try{
                const res = await axios(url);
                if(!didCancel) dispatch({type:'FETCH_SUCCESS',data:res.data});
            }catch (e){
                if(!didCancel) dispatch({type:'FETCH_ERROR'});
            }
            // //不管是错误还是正确都要经过的过程；
            // setIsLoading(false);
        }
        fetchData();

        //清除上次render的副作用
        return () => {
            didCancel = true;
        }
    },[url]);

    return [state, setUrl];
}

const UseMyHook = () => {

    const [query,setQuery] = useState('redux');
    const [state,doFetch] = useDataApi('https://hn.algolia.com/api/v1/search?query=redux',{hits:[]});

    return (
        <div>
            <form onSubmit={(e) => {
                doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`)
                e.preventDefault();
            }}>
                <input type='text' value={query} onChange={e => setQuery(e.target.value)}/>
                <button type={'submit'}>
                    search
                </button>
            </form>

            {state.isError && <p>error occurred</p>}
            {state.isLoading?
                <p>
                  loading...
                </p> :
                <ul>
                    {state.data.hits.map(item => (
                        <li key={item.objectID}>
                            <a href={item.url}>{item.title}</a>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
};

export default UseMyHook;
