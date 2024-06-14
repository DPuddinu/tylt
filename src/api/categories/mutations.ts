import { Category, and, db, eq } from 'astro:db';
import type { TCategory } from 'db/config';

type Payload = {
  authorId: string;
  name: string;
};
export function createCategory({ authorId, name }: Payload) {
  return db.insert(Category).values({
    authorId,
    name
  });
}
export function updateCategory(category: TCategory) {
  return db
    .update(Category)
    .set(category)
    .where(and(eq(Category.authorId, category.authorId), eq(Category.id, category.id)));
}
