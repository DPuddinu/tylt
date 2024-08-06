import { z } from 'astro:content';
import { zfd } from 'zod-form-data';

export const GoalInsertSchema = zfd.formData({
  title: zfd.text(
    z
      .string({
        message: 'Title is required'
      })
      .max(40)
  ),
  description: zfd.text().optional(),
  activityId: zfd.numeric(z.number().int()),
  completionDate: zfd.text(z.string().date().nullish()).transform((date) => (date ? new Date(date) : undefined)),
  dueDate: zfd.text(z.string().date().nullish()).transform((date) => (date ? new Date(date) : undefined))
});
export type GoalInsertPayload = z.infer<typeof GoalInsertSchema> & {
  authorId: string;
  authorName: string;
};
