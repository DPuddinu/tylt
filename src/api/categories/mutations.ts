import CategoriesStore from '@/store/categories.store';
import { Category, and, db, eq } from 'astro:db';
import type { TCategory } from 'db/config';

type Payload = {
  authorId: string;
  name: string;
};
export function createCategory({ authorId, name }: Payload) {
  CategoriesStore.clear();
  return db.insert(Category).values({
    authorId,
    name
  });
}
export function updateCategory(category: TCategory) {
  CategoriesStore.clear();
  return db
    .update(Category)
    .set(category)
    .where(and(eq(Category.authorId, category.authorId), eq(Category.id, category.id)));
}
