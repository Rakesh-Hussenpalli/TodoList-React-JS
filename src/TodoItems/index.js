import './index.css'

const TodoItems = ({ todoItems, deleteTodoItem, enabledEditTask }) => {
    const { id, task } = todoItems
    
    const deleteTodo = () => {
        deleteTodoItem(id)
    }

    const enableEditTask = () => {
        enabledEditTask(id)
    }
    return (
        <li className="list-items-container">
            <div>
                <p className="task">{task}</p>
            </div>
            <div className="buttons-container">
                <button type="button" className="edit-button" onClick={enableEditTask}>Edit</button>
                <button type="button" className="delete-button" onClick={deleteTodo}>Delete</button>
            </div>
        </li>
    )
}

export default TodoItems