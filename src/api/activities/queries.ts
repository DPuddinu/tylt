import store from '@/store/activities.store';
import type { TimeFilter } from '@/types/filters.types';
import { Activity, Goal, and, count, db, desc, eq, gte } from 'astro:db';

export async function getActivities(userId: string) {
  const cachedActivities = store.getCachedActivities();
  if (cachedActivities) {
    return cachedActivities;
  }
  try {
    const activities = await db.select().from(Activity).where(eq(Activity.authorId, userId));
    store.setCachedActivities(activities);
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
  const cachedActivity = store.getCachedActivityById(id);
  if (cachedActivity) {
    console.log('cached activity', cachedActivity);
    return cachedActivity;
  }
  try {
    const activity = await db
      .select()
      .from(Activity)
      .where(and(eq(Activity.id, id), eq(Activity.authorId, userId)))
      .get();

    if (activity) store.updateCachedActivity(activity);
    console.log('activity', activity);
    return activity;
  } catch (error) {
    throw error;
  }
}
export type ActivityWithGoalCount = {
  activityId: number;
  activityName: string;
  goalCount: number;
  icon: string;
  color: string;
};

export async function getGoalsWithActivities({
  userId,
  timeFilter = 'all Time'
}: {
  userId: string;
  timeFilter?: TimeFilter;
}) {
  let timeFilterQuery;
  const oneDay = 24 * 60 * 60 * 1000;

  const cachedTimeFilter = store.getCachedTimeFilter();
  if (cachedTimeFilter !== timeFilter) {
    store.invalidateActivities();
    store.setCachedTimeFilter(timeFilter);
  } else {
    const cachedActivitiesWithGoalCount = store.getCachedActivitiesWithGoalCount();
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
    const cachedActivitiesWithGoalCount = store.getCachedActivitiesWithGoalCount();
    if (cachedActivitiesWithGoalCount) {
      return cachedActivitiesWithGoalCount;
    }
    const res = await db
      .select({
        activityId: Activity.id,
        activityName: Activity.name,
        goalCount: count(Goal.id),
        icon: Activity.icon,
        color: Activity.color
      })
      .from(Activity)
      .where(eq(Activity.authorId, userId))
      .leftJoin(Goal, and(eq(Activity.id, Goal.activityId), timeFilterQuery))
      .groupBy(Activity.id)
      .orderBy(desc(count(Goal.id)));
    store.setCachedActivitiesWithGoalCount(res);
    return res;
  } catch (error) {
    throw error;
  }
}
