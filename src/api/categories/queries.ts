import { Category, Goal, count, db, desc, eq } from 'astro:db';

export function getCategories(userId: string) {
  return db.select().from(Category).where(eq(Category.authorId, userId));
}
export function getCategoryById(id: number) {
  return db.select().from(Category).where(eq(Category.id, id));
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
    .orderBy(desc(count(Goal.id)))
    .limit(10);
}
