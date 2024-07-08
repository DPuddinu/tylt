import { Activity, and, db, eq } from 'astro:db';
import type { TActivity } from 'db/config';

export type CreateActivityPayload = Omit<TActivity, 'id'>;
export async function createActivity(payload: CreateActivityPayload) {
  const res = await db
    .insert(Activity)
    .values({
      ...payload,
      icon: payload.icon ?? 'default'
    })
    .returning()
    .get();
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
  } catch (error) {
    throw error;
  }
}
