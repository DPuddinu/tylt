import { getGoalsByTimePeriod } from '@/api/goals/queries';
import type { APIRoute } from 'astro';

type ShortGoal = {
  completed: boolean;
  creationDate: Date;
};
export type CompletionGoal = {
  completedCount: number;
  notCompletedCount: number;
};
export const GET: APIRoute = async ({ locals }) => {
  const goalsByTimePeriod: ShortGoal[] = await getGoalsByTimePeriod({
    userId: locals.user.id,
    timeFilter: 'all Time'
  });
  const goalsByMonth = goalsByTimePeriod.reduce(
    (acc, goal) => {
      const month = new Date(goal.creationDate).getMonth();

      if (goal.completed) {
        acc[month] = {
          completedCount: acc[month].completedCount + 1,
          notCompletedCount: acc[month].notCompletedCount
        };
      } else {
        acc[month] = {
          completedCount: acc[month].completedCount,
          notCompletedCount: acc[month].notCompletedCount + 1
        };
      }
      return acc;
    },
    new Array<CompletionGoal>(12).fill({
      completedCount: 0,
      notCompletedCount: 0
    })
  );
  return new Response(JSON.stringify(goalsByMonth));
};
