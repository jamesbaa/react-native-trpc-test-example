import {generateOpenApiDocument} from 'trpc-openapi';

import {simpleServiceRoutes} from '../services/simple.service';
import {trpcInstance} from './initTrpc';

export const appRouter = trpcInstance.router({
  ...simpleServiceRoutes,
});

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'tRPC OpenAPI BFF',
  version: '1.0.0',
  baseUrl: 'http://localhost:8080/api',
});
// export type definition of API
export type AppRouter = typeof appRouter;
