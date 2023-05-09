/**
 * Required External Modules
 */

import * as dotenv from 'dotenv';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {appRouter} from './router/appRouter';

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

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
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  '/',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
);
/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
