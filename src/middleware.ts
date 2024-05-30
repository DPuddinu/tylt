import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';

let githubUser: any = null;
const protectedRoutes = ['/goals', '/setup'];

export const onRequest = defineMiddleware(async ({ redirect, request, locals, url }, next) => {
  const matchingRoute = protectedRoutes.some((route) => url.pathname.toLowerCase().includes(route.toLowerCase()));
  if (!matchingRoute) return next();

  const session = await getSession(request);
  const user = session?.user;
  if (!user) {
    return redirect('/');
  }
  if (!githubUser) {
    githubUser = await fetch(`https://api.github.com/users/${user.name}`).then((res) => res.json());
    console.log('SETTING GITHUB USER');
  }
  locals.user = {
    ...user,
    id: githubUser.id
  };

  return next();
});
