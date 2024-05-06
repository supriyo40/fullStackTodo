import React, { useEffect, useState } from "react";
import "./App.css";
import CreateTodo from "./components/CreateTodo";
import DisplayTodo from "./components/DisplayTodo";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos").then(async function (res) {
      const json = await res.json();
      setTodos(json.todos);
    });
  }, []);

  return (
    <>
      <h1>Todo Application</h1>
      <CreateTodo />
      <DisplayTodo todos={todos} />
    </>
  );
}

export default App;
