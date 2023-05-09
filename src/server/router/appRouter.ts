import {initTRPC} from '@trpc/server';

import {simpleServiceRoutes} from '../services/simple.service';

export const trpcInstance = initTRPC.create();
export const appRouter = trpcInstance.router({
  ...simpleServiceRoutes,
});
// export type definition of API
export type AppRouter = typeof appRouter;
