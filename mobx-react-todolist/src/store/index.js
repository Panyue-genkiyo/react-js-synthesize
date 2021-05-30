import count from '../components/Count/countState'
import todos from '../components/Todolist/todoState'
const store = {
    count,
    root:{
        count,
        todos
    }
}

export default store;
