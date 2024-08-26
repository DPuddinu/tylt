import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';
import { getSetupDone } from './api/setup/queries';
import { setupDoneKey } from './utils/constants';

const protectedRoutes = [
  '/goals',
  '/setup',
  '/activities',
  '/reports',
  '/error',
  '/changelog',
  '/ChartsContainer',
  '/barchart',
  '/piechart'
];

export const onRequest = defineMiddleware(async ({ redirect, request, locals, url, cookies }, next) => {
  const matchingRoute = protectedRoutes.some((route) => url.pathname.toLowerCase().includes(route.toLowerCase()));
  if (!matchingRoute) return next();
  const session = await getSession(request);
  const user = session?.user;
  if (!user) {
    console.log('redirecting to /');
    return redirect('/');
  }

  locals.user = {
    ...user,
    id: user.email
  };
  let setupDone;
  if (!cookies.has(setupDoneKey)) {
    setupDone = Boolean(await getSetupDone(locals.user.id));
    cookies.set(setupDoneKey, String(setupDone));
  } else {
    setupDone = cookies.get(setupDoneKey)?.value === 'true';
  }
  if (!setupDone && !url.pathname.includes('setup')) {
    return redirect('/setup');
  }
  return next();
});
