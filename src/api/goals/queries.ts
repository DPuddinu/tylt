import type { GoalFilters } from '@/types/filters.types';
import { toFixedDecimals } from '@/utils/fixed-decimals';
import { Goal, and, count, db, desc, eq, gt, gte, lt, lte } from 'astro:db';

export const ITEMS_PER_PAGE = 5;

type GetPaginatedGoalsParams = {
  userId: string;
  page?: number;
  filters?: GoalFilters;
};
export async function getCompletionRate(userId: string) {
  try {
    const goals = await db.select().from(Goal).where(eq(Goal.authorId, userId));
    const completedGoals = goals.filter((goal) => goal.completed);
    return {
      ratePercentage: toFixedDecimals(100 * (completedGoals.length / goals.length)),
      completedGoalsCount: completedGoals.length,
      totalGoalsCount: goals.length
    };
  } catch (error) {
    throw new Error('Cannot get completion rate');
  }
}
export function getPaginatedGoals({ userId, page = 1, filters }: GetPaginatedGoalsParams) {
  const countGoals = db.select({ count: count() }).from(Goal).where(eq(Goal.authorId, userId)).get();
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const userFilter = eq(Goal.authorId, userId);

  if (!filters)
    return {
      countGoals,
      getGoals: db
        .select()
        .from(Goal)
        .where(userFilter)
        .orderBy(desc(Goal.creationDate))
        .limit(ITEMS_PER_PAGE)
        .offset(offset)
    };
  const { fromDate, toDate, category, expired, notExpired, notCompleted, completed } = filters;

  const conditions = [
    userFilter,
    fromDate ? gte(Goal.creationDate, new Date(fromDate)) : undefined,
    toDate ? lte(Goal.creationDate, new Date(toDate)) : undefined,
    category ? eq(Goal.categoryId, Number(category)) : undefined,
    expired ? lt(Goal.dueDate, new Date()) : undefined,
    notExpired ? gt(Goal.dueDate, new Date()) : undefined,
    completed ? eq(Goal.completed, true) : undefined,
    notCompleted ? eq(Goal.completed, false) : undefined
  ].filter(Boolean);

  return {
    countGoals: db
      .select({ count: count() })
      .from(Goal)
      .where(and(...conditions))
      .get(),
    getGoals: db
      .select()
      .from(Goal)
      .where(and(...conditions))
      .orderBy(desc(Goal.creationDate))
      .limit(ITEMS_PER_PAGE)
      .offset(offset)
  };
}
type getGoalByIdParams = {
  id: number;
  userId: string;
};
export function getGoalById({ id, userId }: getGoalByIdParams) {
  return db
    .select()
    .from(Goal)
    .where(and(eq(Goal.id, Number(id)), eq(Goal.authorId, userId)))
    .get();
}

type GetGoalsByCategoryParams = {
  categoryId: number;
  userId: string;
  page?: number;
};
export function getGoalByCategoryId({ categoryId, userId, page = 1 }: GetGoalsByCategoryParams) {
  const getCategoriesCount = db
    .select({ count: count() })
    .from(Goal)
    .where(and(eq(Goal.categoryId, Number(categoryId)), eq(Goal.authorId, userId)))
    .get();
  const getGoalsByCategory = db
    .select()
    .from(Goal)
    .where(and(eq(Goal.categoryId, Number(categoryId)), eq(Goal.authorId, userId)))
    .orderBy(desc(Goal.creationDate))
    .limit(ITEMS_PER_PAGE)
    .offset((page - 1) * ITEMS_PER_PAGE);

  return {
    getCategoriesCount,
    getGoalsByCategory
  };
}
