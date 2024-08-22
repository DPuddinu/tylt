import { getActivities } from '@/api/activities/queries';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  return new Response(JSON.stringify(await getActivities(locals.user.id)), { status: 200 });
};
