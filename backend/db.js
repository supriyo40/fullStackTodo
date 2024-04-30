const mongoose = require("mongoose");

// connecting to database
mongoose
  .connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
  .then(() => {
    console.log("DB Connected !");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});
const Todo = mongoose.model("todos", todoSchema);

module.exports = {
  Todo,
};
