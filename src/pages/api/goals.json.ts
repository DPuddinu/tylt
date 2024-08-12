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
  const data = [
    {
      id: 1,
      name: 'john'
    },
    {
      id: 2,
      name: 'bon'
    },
    {
      id: 3,
      name: 'jovi'
    }
  ];

  return new Response(
    JSON.stringify({
      data
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}
