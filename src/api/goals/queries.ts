import GoalStore from '@/store/goals.store';
import ReportStore from '@/store/report.store';
import type { GoalFilters } from '@/types/filters.types';
import { toFixedDecimals } from '@/utils/fixed-decimals';
import { Goal, and, count, db, desc, eq, gt, gte, lt, lte } from 'astro:db';
import type { TGoal } from 'db/config';

export const ITEMS_PER_PAGE = 5;

type GetPaginatedGoalsParams = {
  userId: string;
  page?: number;
  filters?: GoalFilters;
};
export async function getCompletionRate(userId: string) {
  const cachedReport = ReportStore.get();
  if (cachedReport) return cachedReport;

  try {
    const goals = await db.select().from(Goal).where(eq(Goal.authorId, userId));
    const completedGoals = goals.filter((goal) => goal.completed);
    const lastWeekGoals = goals.filter((goal) => {
      return goal.completionDate && goal.completionDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    });
    const secondLastWeekGoals = goals.filter((goal) => {
      return (
        goal.completionDate &&
        goal.completionDate > new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) &&
        goal.completionDate < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      );
    });
    const delta = lastWeekGoals.length - secondLastWeekGoals.length;
    ReportStore.set({
      completionRate: toFixedDecimals(100 * (completedGoals.length / goals.length)),
      lastWeekGoalsCount: lastWeekGoals.length,
      totalGoalsCount: goals.length,
      deltaCount: delta
    });
    return {
      completionRate: toFixedDecimals(100 * (completedGoals.length / goals.length)),
      lastWeekGoalsCount: lastWeekGoals.length,
      totalGoalsCount: goals.length,
      deltaCount: delta
    };
  } catch (error) {
    throw new Error('Cannot get completion rate');
  }
}

export async function getPaginatedGoals({ userId, page = 1, filters }: GetPaginatedGoalsParams): Promise<{
  countGoals: number;
  goals: TGoal[];
}> {
  const cachedGoals = GoalStore.getGoalsByPage(page);
  const cachedGoalsCount = GoalStore.getGoalsCount();
  if (cachedGoals && cachedGoalsCount) return { countGoals: cachedGoalsCount, goals: cachedGoals };

  try {
    const userFilter = eq(Goal.authorId, userId);
    const offset = (page - 1) * ITEMS_PER_PAGE;
    let countGoals;
    let getGoals;
    let calls;
    if (!filters) {
      countGoals = db.select({ count: count() }).from(Goal).where(eq(Goal.authorId, userId)).get();
      getGoals = db
        .select()
        .from(Goal)
        .where(userFilter)
        .orderBy(desc(Goal.creationDate))
        .limit(ITEMS_PER_PAGE)
        .offset(offset);
    } else {
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

      countGoals = db
        .select({ count: count() })
        .from(Goal)
        .where(and(...conditions))
        .get();
      getGoals = db
        .select()
        .from(Goal)
        .where(and(...conditions))
        .orderBy(desc(Goal.creationDate))
        .limit(ITEMS_PER_PAGE)
        .offset(offset);
    }

    calls = await Promise.all([countGoals, getGoals]);
    const totalGoals = calls[0]?.count ?? 0;
    GoalStore.set(page, ...calls[1]);
    GoalStore.setGoalsCount(totalGoals);

    return {
      countGoals: totalGoals,
      goals: calls[1]
    };
  } catch (error) {
    throw error;
  }
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
