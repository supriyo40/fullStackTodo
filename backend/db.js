const { default: mongoose } = require("mongoose");

// connecting to database
mongoose.connect(process.env.MONGO_URI);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});
const Todo = mongoose.model("todos", todoSchema);

module.exports = {
  Todo,
};
