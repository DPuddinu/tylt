import { Category, and, db, eq } from 'astro:db';
import type { TCategory } from 'db/config';

export function createCategory(userId: string, name: string) {
  return db.insert(Category).values({
    authorId: userId,
    name
  });
}
export function updateCategory(category: TCategory) {
  return db
    .update(Category)
    .set(category)
    .where(and(eq(Category.authorId, category.authorId), eq(Category.id, category.id)));
}
