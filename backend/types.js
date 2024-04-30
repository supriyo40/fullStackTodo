const z = require("zod");

const parseTodo = z.object({
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean().default(false),
});

const parseId = z.object({
  id: z.string(),
});

module.exports = {
  parseId,
  parseTodo,
};
