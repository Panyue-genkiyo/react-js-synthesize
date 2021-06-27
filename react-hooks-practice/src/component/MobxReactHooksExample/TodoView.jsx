import React from 'react';

const TodoView = ({todos,toggleTodo}) => {
    return (
        <div>
            {todos && todos.map((t,i) => (
                <li onClick={()=>{toggleTodo(i)}}
                    style={{
                        margin:10,
                        opacity: t.complete ? 0.5 : 1,
                        cursor:"pointer",
                        textDecoration: t.complete ? "line-through" : 'none'
                    }}
                 key={t.id}>
                    {t.text}
                </li>
            ))}
        </div>
    );
};

export default TodoView;
