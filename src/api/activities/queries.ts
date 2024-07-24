import type { TimeFilter } from '@/types/filters.types';
import { getTimeFilterQuery } from '@/utils/queries-helpers';
import { Activity, Goal, and, count, db, desc, eq } from 'astro:db';
import { z } from 'zod';

export async function getActivities(userId: string) {
  try {
    const activities = await db.select().from(Activity).where(eq(Activity.authorId, userId));
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
  try {
    const activity = await db
      .select()
      .from(Activity)
      .where(and(eq(Activity.id, id), eq(Activity.authorId, userId)))
      .get();
    return activity;
  } catch (error) {
    throw error;
  }
}

export const ActivityWithGoalSchema = z.object({
  activityId: z.number(),
  activityName: z.string(),
  goalCount: z.number(),
  icon: z.string(),
  color: z.string(),
  completed: z
    .boolean()
    .nullable()
    .transform((value) => !!value)
});
export type ActivityWithGoalCount = z.infer<typeof ActivityWithGoalSchema>;

export async function getGoalsCountPerActivity({
  userId,
  timeFilter = 'all Time'
}: {
  userId: string;
  timeFilter?: TimeFilter;
}): Promise<ActivityWithGoalCount[]> {
  try {
    const res = await db
      .select({
        activityId: Activity.id,
        activityName: Activity.name,
        goalCount: count(Goal.id),
        icon: Activity.icon,
        color: Activity.color,
        completed: Goal.completed
      })
      .from(Activity)
      .where(eq(Activity.authorId, userId))
      .leftJoin(Goal, and(eq(Activity.id, Goal.activityId), getTimeFilterQuery(timeFilter)))
      .groupBy(Activity.id)
      .orderBy(desc(count(Goal.id)));
    const parsed = ActivityWithGoalSchema.array().parse(res);
    return parsed;
  } catch (error) {
    throw error;
  }
}
