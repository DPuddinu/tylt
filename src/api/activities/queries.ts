import activitiesStore, { type TimeFilter } from '@/store/activities.store';
import { Activity, Goal, and, count, db, desc, eq, gte } from 'astro:db';

export async function getActivities(userId: string) {
  const store = activitiesStore.get();

  const cachedActivities = store.getAll();
  if (cachedActivities) return cachedActivities;
  try {
    const activities = await db.select().from(Activity).where(eq(Activity.authorId, userId));
    store.set(activities);
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
  const store = activitiesStore.get();

  const cachedData = store.getActivityById(id);
  if (cachedData) return cachedData;
  try {
    return await db
      .select()
      .from(Activity)
      .where(and(eq(Activity.id, id), eq(Activity.authorId, userId)))
      .get();
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
  const store = activitiesStore.get();
  const oldTimeFilter = store.getTimeFilter();
  if (oldTimeFilter !== timeFilter) {
    store.setTimeFilter(timeFilter);
    store.clearActivitiesWithGoalCount();
  }
  const cachedData = store.getActivitiesWithGoalCount();
  if (cachedData) return cachedData;
  let timeFilterQuery;
  const oneDay = 24 * 60 * 60 * 1000;
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
    const activitiesWithGoalCount = res.filter((activity) => activity.goalCount > 0);
    store.setActivitiesWithGoalCount(activitiesWithGoalCount);
    return activitiesWithGoalCount;
  } catch (error) {
    throw error;
  }
}
