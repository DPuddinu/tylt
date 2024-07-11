import activitiesStore from '@/store/activities.store';
import store from '@/store/goals.store';
import reportStore from '@/store/report.store';
import { type GoalInsertPayload } from '@/types/goal.types';
import { Goal, and, db, eq } from 'astro:db';

export function createGoal(data: GoalInsertPayload) {
  store.invalidateGoals();
  reportStore.invalidateReport();
  activitiesStore.invalidateActivities();
  return db.insert(Goal).values({
    description: data.description ?? '',
    creationDate: new Date(),
    updateDate: new Date(),
    ...data,
    completed: !!data.completionDate
  });
}

type UpdateGoalPayload = Omit<GoalInsertPayload, 'authorId' | 'authorName'> & {
  userId: string;
  goalId: number;
};
export function updateGoal(data: UpdateGoalPayload) {
  store.invalidateGoals();
  reportStore.invalidateReport();
  activitiesStore.invalidateActivities();

  const { completionDate } = data;
  return db
    .update(Goal)
    .set({
      ...data,
      completed: !!completionDate
    })
    .where(and(eq(Goal.authorId, data.userId), eq(Goal.id, data.goalId)))
    .returning()
    .get();
}
