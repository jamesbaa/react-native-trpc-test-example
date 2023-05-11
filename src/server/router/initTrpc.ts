import {initTRPC} from '@trpc/server';
import {OpenApiMeta} from 'trpc-openapi';

export const trpcInstance = initTRPC.meta<OpenApiMeta>().create();
