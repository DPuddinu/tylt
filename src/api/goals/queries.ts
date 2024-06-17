import type { GoalFilters } from '@/types/filters.types';
import { Goal, and, count, db, desc, eq, gt, gte, lt, lte } from 'astro:db';

export const GOALS_PER_PAGE = 5;

type GetPaginatedGoalsParams = {
  userId: string;
  offset?: number;
  filters?: GoalFilters;
};
export function getPaginatedGoals({ userId, offset = 0, filters }: GetPaginatedGoalsParams) {
  const getPages = db.select({ count: count() }).from(Goal).where(eq(Goal.authorId, userId)).get();

  const userFilter = eq(Goal.authorId, userId);

  if (!filters)
    return {
      getPages,
      getGoals: db
        .select()
        .from(Goal)
        .where(userFilter)
        .orderBy(desc(Goal.creationDate))
        .limit(GOALS_PER_PAGE)
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
    getPages,
    getGoals: db
      .select()
      .from(Goal)
      .where(and(...conditions))
      .orderBy(desc(Goal.creationDate))
      .limit(GOALS_PER_PAGE)
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
    .where(and(eq(Goal.id, Number(id)), eq(Goal.authorId, userId)));
}

type GetGoalsByCategoryParams = {
  categoryId: number;
  userId: string;
  offset?: number;
};
export function getGoalByCategoryId({ categoryId, userId, offset = 0 }: GetGoalsByCategoryParams) {
  const getPages = db
    .select({ count: count() })
    .from(Goal)
    .where(and(eq(Goal.categoryId, Number(categoryId)), eq(Goal.authorId, userId)))
    .get();
  const getGoalsByCategory = db
    .select()
    .from(Goal)
    .where(and(eq(Goal.categoryId, Number(categoryId)), eq(Goal.authorId, userId)))
    .orderBy(desc(Goal.creationDate))
    .limit(GOALS_PER_PAGE)
    .offset(offset);

  return {
    getPages,
    getGoalsByCategory
  };
}
