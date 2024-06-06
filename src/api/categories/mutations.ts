import { Category, db } from 'astro:db';

export function createCategory(userId: string, name: string) {
  return db.insert(Category).values({
    authorId: userId,
    name
  });
}
