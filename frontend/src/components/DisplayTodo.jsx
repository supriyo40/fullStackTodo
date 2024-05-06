import React, { useState } from "react";

function DisplayTodo({ todos }) {
  const completed = (todo) => {
    const todoId = todo._id;

    fetch("http://localhost:3000/completed", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: todoId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo._id}>
            <h1>{todo.title}</h1>
            <h3>{todo.description}</h3>
            <button onClick={() => completed(todo)}>
              {todo.completed ? "completed" : "mark as complete"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default DisplayTodo;
