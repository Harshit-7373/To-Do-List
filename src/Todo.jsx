import React, { useState } from 'react';
import'./Todo.css'

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const addOrUpdateTodo = () => {
        if (inputValue.trim() === '') return;

        if (isEditing) {
            setTodos(todos.map(todo =>
                todo.id === editId ? { ...todo, text: inputValue } : todo
            ));
            setIsEditing(false);
            setEditId(null);
        } else {
            const newTodo = {
                id: new Date().getTime(),
                text: inputValue,
            };
            setTodos([...todos, newTodo]);
        }

        setInputValue('');
    };

    const editTodo = (id) => {
        const todoToEdit = todos.find((todo) => todo.id === id);
        setInputValue(todoToEdit.text);
        setIsEditing(true);
        setEditId(id);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="todo-container">
            <h2>ToDo List</h2>
            <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} 
            />
            <button onClick={addOrUpdateTodo}>
                {isEditing ? 'Update' : 'Add'}
            </button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.text}
                        <div>
                            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                            <button onClick={() => editTodo(todo.id)}>Edit</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
