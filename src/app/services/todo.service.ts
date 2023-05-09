import type {inferProcedureOutput, inferProcedureInput} from '@trpc/server';
import {createApi} from '@reduxjs/toolkit/query/react';
import {trpcClient} from '../../../App';
import {AppRouter} from '../../server/router/appRouter';

type TodosSpecificRes = inferProcedureOutput<AppRouter['getSpecificTodo']>;
type TodoSpecificIn = inferProcedureInput<AppRouter['getSpecificTodo']>;
type TodosAllRes = inferProcedureOutput<AppRouter['getAllTodos']>;
type TodoAllIn = inferProcedureInput<AppRouter['getAllTodos']>;

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: (trpcResult: Promise<unknown>) =>
    trpcResult.then(data => ({data})).catch(error => ({error})),
  endpoints: builder => ({
    getSpecificTodo: builder.query<TodosSpecificRes, TodoSpecificIn>({
      query: trpcClient.getSpecificTodo.query,
    }),
    getAllTodos: builder.query<TodosAllRes, TodoAllIn>({
      query: trpcClient.getAllTodos.query,
    }),
  }),
});

export const {useGetSpecificTodoQuery, useGetAllTodosQuery} = todosApi;
