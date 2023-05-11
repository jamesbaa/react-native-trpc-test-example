import axios from 'axios';
const baseTodo = 'https://jsonplaceholder.typicode.com/todos';
import {z} from 'zod';
import {Todo} from '..';
import {trpcInstance} from '../router/initTrpc';

export const simpleService = {
  todoLogic: async (todo?: number) => {
    //This service would be any of the bff fetching logic eg: GraphQL requests and orchestration
    //whatever is returned out of this function is what is sent client side.
    const path = todo ? `${baseTodo}/${todo}` : baseTodo;
    try {
      const data = await axios.get(path);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  },
};
const todoOutput = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

//Define 'endpoints' For above service
// In bigger project this would probably look something like todos.service & todos.routes
export const simpleServiceRoutes = {
  getSpecificTodo: trpcInstance.procedure
    .meta({openapi: {method: 'GET', path: '/specific-todos', tags: ['Todo']}})
    .input(z.object({id: z.number()})) //ZOD defines the body type here is a simple number for input
    .output(todoOutput)
    .query(async (req): Promise<Todo> => {
      const res = await simpleService.todoLogic(req.input.id);
      return res;
    }),
  getAllTodos: trpcInstance.procedure
    .meta({openapi: {method: 'GET', path: '/all-todos', tags: ['Todo']}})
    .input(z.undefined())
    .output(z.array(todoOutput))
    .query(async (): Promise<Todo[]> => {
      //This Query has no body hence 'input' is omitted
      const res = await simpleService.todoLogic();
      return res;
    }),
};
