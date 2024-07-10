import {
  getCachedActivities,
  getCachedActivitiesWithGoalCount,
  getCachedActivityById,
  getCachedTimeFilter,
  invalidateActivities,
  setCachedActivities,
  setCachedActivitiesWithGoalCount,
  setCachedTimeFilter,
  updateCachedActivity
} from '@/store/activities.store';
import type { TimeFilter } from '@/types/filters.types';
import { Activity, Goal, and, count, db, desc, eq, gte } from 'astro:db';

export async function getActivities(userId: string) {
  const cachedActivities = getCachedActivities();
  if (cachedActivities) {
    return cachedActivities;
  }
  try {
    const activities = await db.select().from(Activity).where(eq(Activity.authorId, userId));
    setCachedActivities(activities);
    return activities;
  } catch (error) {
    throw error;
  }
}
type GetActivityByIdParams = {
  userId: string;
  id: number;
};
export async function getActivityById({ id, userId }: GetActivityByIdParams) {
  const cachedActivity = getCachedActivityById(id);
  if (cachedActivity) {
    return cachedActivity;
  }
  try {
    const activity = await db
      .select()
      .from(Activity)
      .where(and(eq(Activity.id, id), eq(Activity.authorId, userId)))
      .get();
    if (activity) updateCachedActivity(activity);
  } catch (error) {
    throw error;
  }
}
export type ActivityWithGoalCount = {
  activityId: number;
  activityName: string;
  goalCount: number;
};

export async function getMostUsedActivity({ userId, timeFilter }: { userId: string; timeFilter: TimeFilter }) {
  let timeFilterQuery;
  const oneDay = 24 * 60 * 60 * 1000;

  const cachedTimeFilter = getCachedTimeFilter();
  if (cachedTimeFilter !== timeFilter) {
    invalidateActivities();
    setCachedTimeFilter(timeFilter);
  } else {
    const cachedActivitiesWithGoalCount = getCachedActivitiesWithGoalCount();
    if (cachedActivitiesWithGoalCount) {
      return cachedActivitiesWithGoalCount;
    }
  }
  switch (timeFilter) {
    case 'week':
      const oneWeekAgo = new Date(new Date().getTime() - 7 * oneDay);
      timeFilterQuery = gte(Goal.creationDate, oneWeekAgo);
      break;
    case 'month':
      const oneMonthAgo = new Date(new Date().getTime() - 30 * oneDay);
      timeFilterQuery = gte(Goal.creationDate, oneMonthAgo);
      break;
    case 'all Time':
      timeFilterQuery = undefined;
      break;
    default:
      timeFilterQuery = undefined;
      break;
  }
  try {
    const cachedActivitiesWithGoalCount = getCachedActivitiesWithGoalCount();
    if (cachedActivitiesWithGoalCount) {
      return cachedActivitiesWithGoalCount;
    }
    const res = await db
      .select({
        activityId: Activity.id,
        activityName: Activity.name,
        goalCount: count(Goal.id)
      })
      .from(Activity)
      .where(eq(Activity.authorId, userId))
      .leftJoin(Goal, and(eq(Activity.id, Goal.activityId), timeFilterQuery))
      .groupBy(Activity.id)
      .orderBy(desc(count(Goal.id)));
    setCachedActivitiesWithGoalCount(res);
    return res;
  } catch (error) {
    throw error;
  }
}
