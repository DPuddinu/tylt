import activitiesStore from '@/store/activities.store';
import { Activity, Goal, and, count, db, desc, eq } from 'astro:db';

export async function getActivities(userId: string) {
  const cachedCategories = activitiesStore.getAll();
  if (cachedCategories) return cachedCategories;
  try {
    const activities = await db.select().from(Activity).where(eq(Activity.authorId, userId));
    activitiesStore.set(activities);
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
  const cachedData = activitiesStore.getActivityById(id);
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
  categoryName: string;
  goalCount: number;
};
export async function getMostUsedActivity(userId: string) {
  const cachedData = activitiesStore.getActivitiesWithGoalCount();
  if (cachedData) return cachedData;
  try {
    const res = await db
      .select({
        activityId: Activity.id,
        categoryName: Activity.name,
        goalCount: count(Goal.id)
      })
      .from(Activity)
      .where(eq(Activity.authorId, userId))
      .leftJoin(Goal, eq(Activity.id, Goal.activityId))
      .groupBy(Activity.id)
      .orderBy(desc(count(Goal.id)));
    activitiesStore.setActivitiesWithGoalCount(res);
    return res;
  } catch (error) {
    throw error;
  }
}
