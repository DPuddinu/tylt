import { z } from 'astro:content';
import { zfd } from 'zod-form-data';

export const GoalInsertSchema = zfd.formData({
  title: zfd.text(
    z.string({
      message: 'Title is required'
    })
  ),
  description: zfd.text().optional(),
  categoryId: zfd.numeric(z.number().int().positive('Category ID must be a positive integer')),
  completionDate: zfd.text(z.string().date().nullish()).transform((date) => (date ? new Date(date) : undefined)),
  dueDate: zfd.text(z.string().date().nullish()).transform((date) => (date ? new Date(date) : undefined))
});

export type GoalInsertPayload = z.infer<typeof GoalInsertSchema> & {
  authorId: string;
  authorName: string;
};

type Key = 'title' | 'description' | 'categoryId' | 'completionDate' | 'dueDate';
export const GoalFormNames: Record<Key, Key> = {
  title: 'title',
  description: 'description',
  categoryId: 'categoryId',
  completionDate: 'completionDate',
  dueDate: 'dueDate'
};
