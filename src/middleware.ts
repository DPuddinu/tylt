import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';

export const onRequest = defineMiddleware(async (context, next) => {
  const protectedRoutes = ['/goals', '/setup'];
  const { redirect, request, locals, url } = context;
  const session = await getSession(request);
  const user = session?.user;
  if (url.pathname === '/') return next();
  if (protectedRoutes.some((route) => url.pathname.toLowerCase().includes(route.toLowerCase())) && !user) {
    return redirect('/');
  }
  if (user) {
    locals.user = {
      ...user,
      id: user.id ?? user.email
    };
  }

  return next();
});
