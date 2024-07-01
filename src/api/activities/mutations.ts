import CategoriesStore from '@/store/activities.store';
import { Activity, and, db, eq } from 'astro:db';
import type { TActivity } from 'db/config';

export type CreateActivityPayload = {
  authorId: string;
  name: string;
};
export async function createActivity({ authorId, name }: CreateActivityPayload) {
  const res = await db
    .insert(Activity)
    .values({
      authorId,
      name
    })
    .returning()
    .get();
  CategoriesStore.addActivity(res);
  CategoriesStore.clearActivitiesWithGoalCount();
  return res;
}
export async function updateActivity(activity: TActivity) {
  try {
    const res = await db
      .update(Activity)
      .set(activity)
      .where(and(eq(Activity.authorId, activity.authorId), eq(Activity.id, activity.id)))
      .returning()
      .get();
    CategoriesStore.updateActivity(res);
    CategoriesStore.clearActivitiesWithGoalCount();
  } catch (error) {
    throw error;
  }
}
