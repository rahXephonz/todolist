import { z } from "zod";

enum PriorityEnum {
  "normal",
  "high",
  "very-high",
  "low",
  "very-low",
}

export const TypeTodos = z.object({
  id: z.number(),
  activity_group_id: z.string(),
  title: z.string(),
  is_active: z.number(),
  priority: z.string(),
  created_at: z.string(),
});

export const TypeActivities = z.object({
  id: z.number(),
  email: z.string(),
  title: z.string(),
  created_at: z.string(),
});

export type Priority = keyof typeof PriorityEnum;

export type Todos = z.infer<typeof TypeTodos>;
export type Activities = z.infer<typeof TypeActivities>;
