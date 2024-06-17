import { Category, Goal, and, count, db, desc, eq } from 'astro:db';

export function getCategories(userId: string) {
  return db.select().from(Category).where(eq(Category.authorId, userId));
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
export function getMostUsedCategory(userId: string) {
  return db
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
}
