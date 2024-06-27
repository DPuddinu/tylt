import CategoriesStore from '@/store/categories.store';
import { Category, Goal, and, count, db, desc, eq } from 'astro:db';

export async function getCategories(userId: string) {
  const cachedCategories = CategoriesStore.getAll();
  if (cachedCategories) return cachedCategories;
  try {
    const categories = await db.select().from(Category).where(eq(Category.authorId, userId));
    CategoriesStore.set(categories);
    return categories;
  } catch (error) {
    throw error;
  }
}
type GetCategoryByIdParams = {
  userId: string;
  id: number;
};
export function getCategoryById({ id, userId }: GetCategoryByIdParams) {
  return db
    .select()
    .from(Category)
    .where(and(eq(Category.id, id), eq(Category.authorId, userId)))
    .get();
}
export type CategoryWithGoalCount = {
  categoryId: number;
  categoryName: string;
  goalCount: number;
};
export async function getMostUsedCategory(userId: string) {
  const cachedData = CategoriesStore.getCategoriesWithGoalCount();
  if (cachedData) return cachedData;
  const res = await db
    .select({
      categoryId: Category.id,
      categoryName: Category.name,
      goalCount: count(Goal.id)
    })
    .from(Category)
    .where(eq(Category.authorId, userId))
    .leftJoin(Goal, eq(Category.id, Goal.categoryId))
    .groupBy(Category.id)
    .orderBy(desc(count(Goal.id)));
  CategoriesStore.setCategoriesWithGoalCount(res);
  return res;
}
