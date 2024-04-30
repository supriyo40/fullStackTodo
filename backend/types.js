const z = require("zod");

const parseTodo = z.object({
  title: z.string(),
  description: z.string().optional(),
});

const parseId = z.object({
  id: z.string(),
});

const updateTodo = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  id: z.string(),
});

module.exports = {
  parseId,
  parseTodo,
  updateTodo,
};
