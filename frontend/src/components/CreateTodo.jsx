import React, { useState } from "react";

function CreateTodo() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const AddTitle = (e) => {
    setTitle(e.target.value);
  };

  const AddDescription = (e) => {
    setDesc(e.target.value);
  };

  const AddTodo = () => {
    const newTodo = {
      title: title,
      description: desc,
    };

    fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add todo");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTitle("");
        setDesc("");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add todo");
      });
  };

  return (
    <div>
      <input onChange={AddTitle} type="text" placeholder="Add Title" />
      <input
        onChange={AddDescription}
        type="text"
        placeholder="Add Description"
      />
      <button onClick={AddTodo}>Submit</button>
    </div>
  );
}

export default CreateTodo;
