import { z } from 'astro:content';

export const GoalSchema = z.object({
  title: z.string({
    message: 'Title is required'
  }),
  description: z.string().optional(),
  categoryId: z.number().int().positive('Category ID must be a positive integer'),
  completionDate: z.date().nullable(),
  dueDate: z.date().nullable()
});
