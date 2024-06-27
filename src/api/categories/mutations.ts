import CategoriesStore from '@/store/categories.store';
import { Category, and, db, eq } from 'astro:db';
import type { TCategory } from 'db/config';

type Payload = {
  authorId: string;
  name: string;
};
export async function createCategory({ authorId, name }: Payload) {
  const res = await db
    .insert(Category)
    .values({
      authorId,
      name
    })
    .returning()
    .get();
  CategoriesStore.addCategory(res);
}
export async function updateCategory(category: TCategory) {
  try {
    const res = await db
      .update(Category)
      .set(category)
      .where(and(eq(Category.authorId, category.authorId), eq(Category.id, category.id)))
      .returning()
      .get();
    CategoriesStore.updateCategory(res);
  } catch (error) {
    throw error;
  }
}
