const express = require("express");
require("dotenv").config();
const { Todo } = require("./db");
const cors = require("cors");
const { parseTodo, parseId, updateTodo } = require("./types");

const app = express();
app.use(express.json());

app.use(cors());

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
  const parsedTodo = parseTodo.safeParse(todo);
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
  const parsedId = parseId.safeParse(createPayload);
  if (!parsedId.success) {
    res.status(411).json({
      error: "valid id",
    });
  }

  await Todo.findOneAndUpdate(
    {
      _id: createPayload.id,
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
app.put("/update", async (req, res) => {
  const createPayload = req.body;
  const parsedTodo = updateTodo.safeParse(createPayload);
  if (!parsedTodo.success) {
    res.status(411).json({
      error: "valid inputs",
    });
  }

  const updatedTodo = {};

  if (createPayload.title) updatedTodo.title = createPayload.title;
  if (createPayload.description)
    updatedTodo.description = createPayload.description;
  await Todo.findOneAndUpdate(
    {
      _id: createPayload.id,
    },
    updatedTodo,
    { new: true }
  );
  res.json({
    message: "updated successfully",
  });
});

//delete todo
app.delete("/delete", async (req, res) => {
  const createPayload = req.body;
  const parsedId = parseId.safeParse(createPayload);
  if (!parsedId.success) {
    res.status(411).json({
      error: "valid id",
    });
  }
  await Todo.findOneAndDelete({
    _id: createPayload.id,
  });
  res.json({
    message: "todo deleted",
  });
});

app.listen(3000, () => {
  console.log("Server is port 3000");
});
