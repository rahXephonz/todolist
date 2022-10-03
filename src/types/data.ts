import { z } from "zod";

export const TypeTodos = z.object({
  id: z.number(),
  activity_group_id: z.string(),
  title: z.string(),
  is_active: z.string(),
  priority: z.string(),
  created_at: z.string(),
});

export const TypeActivities = z.object({
  id: z.number(),
  email: z.string(),
  title: z.string(),
  created_at: z.string(),
});

export type Todos = z.infer<typeof TypeTodos>;
export type Activites = z.infer<typeof TypeActivities>;
