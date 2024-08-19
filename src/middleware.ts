import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';
import { getSetupDone } from './api/setup/queries';
import { setupDoneKey } from './utils/constants';

const protectedRoutes = ['/goals', '/setup', '/activities', '/reports', '/error', '/changelog'];

export const onRequest = defineMiddleware(async ({ redirect, request, locals, url, cookies }, next) => {
  const matchingRoute = protectedRoutes.some((route) => url.pathname.toLowerCase().includes(route.toLowerCase()));
  if (!matchingRoute) return next();
  console.log(request);
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
  const revalidate = cookies.get('revalidate')?.value;
  const { method, headers } = request;

  // if (revalidate) {
  //   const pagesToRevalidate = JSON.parse(revalidate);
  //   console.log(pagesToRevalidate, url.pathname);
  //   const found = pagesToRevalidate.indexOf((page: string) => {
  //     console.log(page, url.pathname);
  //     return url.pathname === page;
  //   });
  //   if (found !== -1) {
  //     console.log('found -------> ', found);
  //     console.log(pagesToRevalidate[found]);
  //     // cookies.set('revalidate', )
  //     request.headers.set('cache', 'reload');
  //   }
  // }

  // if(method === 'POST'){}
  // console.log(headers.get('If-None-Match'));
  // if (method === 'GET' && revalidate && request.url === revalidate) {
  //   cookies.set('revalidate', '', {
  //     maxAge: 0
  //   });
  //   console.log(revalidate);
  //   console.log(request.url);
  //   return next().then((res) => res.headers.set('ETag', crypto.randomUUID()));
  // } else return next();
  return next();
});
