import React, { useState, useEffect, Suspense } from "react";
import Context from "./context";
import Loader from "./Loader";
import Modal from "./Modal/Modal";
import ToDoList from "./ToDo/ToDoList";

 const AddTodo = React.lazy(()=>import('./ToDo/AddToDo'))

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=15')
      .then(response => response.json())
      .then(todos => {
        setTodos(todos)
        setLoading(false)
      })
  }, [])

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function addTodo(title) {
    setTodos(todos.concat([{ title, id: Date.now(), completed: false }]));
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React Tutorial</h1>

        <Modal />

        <Suspense fallback={<p><Loader /></p>}>
          <AddTodo onCreate={addTodo} />
        </Suspense>
        
        {loading && <Loader />}
        {todos.length ? (
          <ToDoList todos={todos} onToggle={toggleTodo} />
        ) : (
            loading ? null : <p>No Todos</p>
          )}
      </div>
    </Context.Provider>
  );
}

export default App;
