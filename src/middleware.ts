import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';
import { getSetupDone } from './api/setup/queries';

const protectedRoutes = ['/goals', '/setup', '/activities', '/reports', '/error', '/changelog'];
export const onRequest = defineMiddleware(async ({ redirect, request, locals, url }, next) => {
  const matchingRoute = protectedRoutes.some((route) => url.pathname.toLowerCase().includes(route.toLowerCase()));
  if (!matchingRoute) return next();

  const session = await getSession(request);
  const user = session?.user;
  if (!user) {
    return redirect('/');
  }

  locals.user = {
    ...user,
    id: user.email
  };
  if (!(await getSetupDone(locals.user.id)) && !url.pathname.includes('setup')) return redirect('/setup');
  return next();
});
