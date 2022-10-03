import { z } from "zod";

export const UsersType = z.object({
  email: z.string(),
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  username: z.string(),
  website: z.string(),
});

export type Users = z.infer<typeof UsersType>;

export const TodosType = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
  userId: z.number(),
});

export type Todos = z.infer<typeof TodosType>;
