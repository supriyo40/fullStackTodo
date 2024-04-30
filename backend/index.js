const express = require("express");
const { Todo } = require("./db");
const { parseTodo, parseId } = require("./types");

const app = express();

//get todo
app.get("/todos", async (req, res) => {
  const todos = await Todo.find({});
  res.json({
    todos,
  });
});

//create todo
app.post("/todo", async (req, res) => {
  const todo = req.body;
  const parsedTodo = parseTodo(todo);
  if (!parsedTodo.success) {
    res.status(400).json({
      error: "valid inputs",
    });
  }
  await Todo.create({
    title: todo.title,
    description: todo.description,
    completed: false,
  });
  res.json({
    message: "todo created",
  });
});

//completed
app.put("/completed", async (req, res) => {
  const createPayload = req.body;
  const parsedId = parseId(createPayload);
  if (!parsedId.success) {
    res.status(411).json({
      error: "valid id",
    });
  }

  await Todo.findOneAndUpdate(
    {
      _id: parsedId.id,
    },
    {
      completed: true,
    }
  );
  res.json({
    message: "todo marked as completed",
  });
});

//update todo
app.put("update", async (req, res) => {
  const createPayload = req.body;
  const parsedTodo = parseTodo(createPayload);
  if (!parsedTodo.success) {
    res.status(411).json({
      error: "valid inputs",
    });
  }
  await Todo.findOneAndUpdate(
    {
      _id: createPayload.id,
    },
    {
      title: createPayload.title,
      description: createPayload.description,
    }
  );
});

//delete todo
app.delete("/delete", async (req, res) => {
  const createPayload = req.body;
  const parsedId = parseId(createPayload);
  if (!parsedId.success) {
    res.status(411).json({
      error: "valid id",
    });
  }
  await Todo.findOneAndDelete({
    _id: parsedId.id,
  });
});

app.listen(3000, () => {
  console.log("Server is port 3000");
});
