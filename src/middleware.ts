import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';
import { getSetupDone } from './api/setup/queries';

let githubUser: any = null;
let setupDone = false;
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
  }

  locals.user = {
    ...user,
    id: String(githubUser.id)
  };

  if (!setupDone) {
    const [firstSetupDone] = await getSetupDone(locals.user.id);
    setupDone = !!firstSetupDone;
  }

  if (matchingRoute && url.pathname !== '/setup' && !setupDone) {
    return redirect('/setup');
  }
  return next();
});
