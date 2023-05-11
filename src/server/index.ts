/**
 * Required External Modules
 */

import * as dotenv from 'dotenv';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import {appRouter, openApiDocument} from './router/appRouter';
import {createOpenApiExpressMiddleware} from 'trpc-openapi';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

export const PORT: number = parseInt(process.env.PORT as string, 10);

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const app = express();
/**
 *  App Configuration
 */

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
);
app.use('/api', createOpenApiExpressMiddleware({router: appRouter}));
// Serve Swagger UI with our OpenAPI schema
app.use('/', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(openApiDocument));
/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
