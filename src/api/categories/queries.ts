import { Category, db, eq } from 'astro:db';

export function getCategories(userId: string) {
  return db.select().from(Category).where(eq(Category.authorId, userId));
}
