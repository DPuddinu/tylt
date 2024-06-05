import type { GoalFilters } from '@/types/filters';
import { Goal, and, db, desc, eq, gt, gte, lt, lte } from 'astro:db';

export const GOALS_PER_PAGE = 5;

export function getPaginatedGoals(userId: string, offset = 0, filters?: GoalFilters) {
  const userFilter = eq(Goal.authorId, userId);
  if (!filters)
    return db
      .select()
      .from(Goal)
      .where(userFilter)
      .orderBy(desc(Goal.creationDate))
      .limit(GOALS_PER_PAGE)
      .offset(offset);
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

  return db
    .select()
    .from(Goal)
    .where(and(...conditions))
    .orderBy(desc(Goal.creationDate))
    .limit(GOALS_PER_PAGE * (offset > 0 ? offset : 1))
    .offset(offset);
}
