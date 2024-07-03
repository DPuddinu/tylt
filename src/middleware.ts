import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';
import { getSetupDone } from './api/setup/queries';
import settingsStore from './store/settings.store';

let githubUser: any = null;
const protectedRoutes = ['/goals', '/setup', '/activities', '/reports', '/error', '/changelog'];
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

  if (!settingsStore.getSetupDone()) {
    const [firstSetupDone] = await getSetupDone(locals.user.id);
    if (firstSetupDone) {
      settingsStore.setSetupDone(!!firstSetupDone);
    }
  }

  if (matchingRoute && url.pathname !== '/setup' && !settingsStore.getSetupDone()) {
    return redirect('/setup');
  }
  locals.setupDone = settingsStore.getSetupDone();

  return next();
});
