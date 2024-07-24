import type { GoalFilters, TimeFilter } from '@/types/filters.types';
import { toFixedDecimals } from '@/utils/fixed-decimals';
import { getTimeFilterQuery } from '@/utils/queries-helpers';
import { Goal, and, count, db, desc, eq, gt, gte, lt, lte } from 'astro:db';
import type { TGoal } from 'db/config';

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
    const report = {
      completedCount: completedGoals.length,
      completionRate: toFixedDecimals(100 * (completedGoals.length / goals.length)),
      lastWeekGoalsCount: lastWeekGoals.length,
      totalGoalsCount: goals.length,
      deltaCount: delta
    };
    return report;
  } catch (error) {
    throw new Error('Cannot get completion rate');
  }
}

export async function getPaginatedGoals({ userId, page = 1, filters }: GetPaginatedGoalsParams): Promise<{
  countGoals: number;
  goals: TGoal[];
}> {
  try {
    const userFilter = eq(Goal.authorId, userId);
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const conditions = [
      userFilter,
      filters?.fromDate ? gte(Goal.creationDate, new Date(filters.fromDate)) : undefined,
      filters?.toDate ? lte(Goal.creationDate, new Date(filters.toDate)) : undefined,
      filters?.activity ? eq(Goal.activityId, Number(filters.activity)) : undefined,
      filters?.expired ? lt(Goal.dueDate, new Date()) : undefined,
      filters?.notExpired ? gt(Goal.dueDate, new Date()) : undefined,
      filters?.completed ? eq(Goal.completed, true) : undefined,
      filters?.notCompleted ? eq(Goal.completed, false) : undefined
    ].filter(Boolean);

    const getCountGoals = db
      .select({ count: count() })
      .from(Goal)
      .where(and(...conditions))
      .get();
    const getGoals = db
      .select()
      .from(Goal)
      .where(and(...conditions))
      .orderBy(desc(Goal.creationDate))
      .limit(ITEMS_PER_PAGE)
      .offset(offset);

    const calls = await Promise.all([getCountGoals, getGoals]);
    const countGoals = calls[0]?.count ?? 0;
    const goals = calls[1];
    return {
      countGoals,
      goals
    };
  } catch (error) {
    throw error;
  }
}
type getGoalByIdParams = {
  id: number;
  userId: string;
};
export async function getGoalById({ id, userId }: getGoalByIdParams) {
  try {
    return await db
      .select()
      .from(Goal)
      .where(and(eq(Goal.id, Number(id)), eq(Goal.authorId, userId)))
      .get();
  } catch (error) {
    throw error;
  }
}

type GetGoalsByActivityParams = {
  activityId: number;
  userId: string;
  page?: number;
};
export async function getGoalByActivityId({ activityId, userId, page = 1 }: GetGoalsByActivityParams) {
  try {
    const calls = await Promise.all([
      db
        .select({ count: count() })
        .from(Goal)
        .where(and(eq(Goal.activityId, Number(activityId)), eq(Goal.authorId, userId)))
        .get(),
      db
        .select()
        .from(Goal)
        .where(and(eq(Goal.activityId, Number(activityId)), eq(Goal.authorId, userId)))
        .orderBy(desc(Goal.creationDate))
        .limit(ITEMS_PER_PAGE)
        .offset((page - 1) * ITEMS_PER_PAGE)
    ]);
    const getActivitiesCount = calls[0];
    const getGoalsByActivity = calls[1];

    return {
      count: getActivitiesCount?.count ?? 0,
      goals: getGoalsByActivity,
      id: activityId
    };
  } catch (error) {
    throw error;
  }
}

export async function getGoalsByTimePeriod({
  userId,
  timeFilter = 'all Time'
}: {
  userId: string;
  timeFilter?: TimeFilter;
}) {
  try {
    return await db
      .select({
        title: Goal.title,
        completed: Goal.completed,
        creationDate: Goal.creationDate
      })
      .from(Goal)
      .where(and(eq(Goal.authorId, userId), getTimeFilterQuery(timeFilter)));
  } catch (error) {
    throw error;
  }
}
