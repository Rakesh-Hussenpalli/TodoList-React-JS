import React, { useState } from 'react';
import './index.css';
import TodoItems from '../TodoItems';

const TodoList = () => {
    const [inputValue, setInputValue] = useState({
        id: "",
        msg: ""
    });
    const [todoList, setTodoList] = useState([]);
    const [editTask, setEditTask] = useState({
        id: "",
        isEdit: false
    });

    const handleInput = (event) => {
        setInputValue({
            ...inputValue,
            msg: event.target.value
        });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (inputValue.msg === "") {
            alert("Enter Your Task")
        }
        else {
            const newTodo = {
                id: new Date().getTime().toString(),
                task: inputValue.msg
            };
            const updatedTodos = [...todoList, newTodo]
            setTodoList(updatedTodos)
            setInputValue({
                ...inputValue,
                id: "",
                msg: ""
            })
        }
    }

    const deleteTodoItem = (id) => {
        const filteredTodoList = todoList.filter((eachTodo) => {
            return eachTodo.id !== id
        });
        setTodoList(filteredTodoList);
    }

    const enabledEditTask = (id) => {
        setEditTask({
            ...editTask,
            id: id,
            isEdit: true
        });

        const editableTask = todoList.find((eachTodo) => {
            return eachTodo.id === id
        });
        setInputValue({
            ...inputValue,
            id: editableTask.id,
            msg: editableTask.task
        });
    }

    const editHandler = (event) => {
        event.preventDefault();
        const editableTodoList = todoList.map((eachTodo) => {
            if (eachTodo.id === editTask.id) {
                return {
                    id: editTask.id,
                    task: inputValue.msg
                }
            }
            else {
                return eachTodo
            }
        });
        setTodoList(editableTodoList)
        setInputValue({
            id: "",
            msg: ""
        })
        setEditTask({
            ...editTask,
            id: "",
            isEdit: false
        })
    }
    return (
        <div className="bg-container">
            <h1 className="heading">TodoList using React JS</h1>
            <form>
                <div className="input-container">
                    <input type="text" className="input-text" placeholder="Enter your Task" value={inputValue.msg} onChange={handleInput} />
                    <br />
                    {(editTask.isEdit) ? <button type="button" className="add-button" onClick={editHandler} >Edit</button> : <button type="button" className="add-button" onClick={submitHandler} >Add</button>}
                </div>
                {(todoList.length === 0) ? <h2>Display your Tasks Here!</h2> :
                    <ul className="todo-items-container">
                        {todoList.map((eachTodo) => {
                            return <TodoItems todoItems={eachTodo} key={eachTodo.id} deleteTodoItem={deleteTodoItem} enabledEditTask={enabledEditTask} />
                        })}
                    </ul>}
            </form>
        </div>
    )
}

export default TodoList;
