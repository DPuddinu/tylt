import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const user = context.locals.user;
  // const product = await getActivities(id);

  // if (!product) {
  //   return new Response(null, {
  //     status: 404,
  //     statusText: 'Not found'
  //   });
  // }

  return new Response(
    JSON.stringify({
      user
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Netlify-CDN-Cache-Control': 'public, durable, max-age=3600, stale-while-revalidate=120'
      }
    }
  );
}
