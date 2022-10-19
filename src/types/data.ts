import { z } from "zod";

const priorities = ["normal", "high", "very-high", "low", "very-low"] as const;

export const TypeTodos = z.object({
  id: z.number(),
  activity_group_id: z.string(),
  title: z.string(),
  is_active: z.number(),
  priority: z.enum(priorities),
  created_at: z.string(),
});

export const TypeActivities = z.object({
  id: z.number(),
  email: z.string(),
  title: z.string(),
  created_at: z.string(),
});

export type Priority = typeof priorities[number];
export type Todos = z.infer<typeof TypeTodos>;
export type Activities = z.infer<typeof TypeActivities>;
