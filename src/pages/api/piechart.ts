import { getGoalsCountPerActivity } from '@/api/activities/queries';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const goalsWithActivities = await getGoalsCountPerActivity({ userId: locals.user.id });

  return new Response(JSON.stringify(goalsWithActivities));
};
