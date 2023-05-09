import axios from 'axios';
const baseTodo = 'https://jsonplaceholder.typicode.com/todos';
import {z} from 'zod';
import {Todo} from '..';
import {trpcInstance} from '../router/appRouter';

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

//Define 'endpoints' For above service
// In bigger project this would probably look something like todos.service & todos.routes
export const simpleServiceRoutes = {
  getSpecificTodo: trpcInstance.procedure
    .input(z.number()) //ZOD defines the body type here is a simple number for input
    .query(async (req): Promise<Todo[]> => {
      const res = await simpleService.todoLogic(req.input);
      return res;
    }),
  getAllTodos: trpcInstance.procedure.query(async (): Promise<Todo[]> => {
    //This Query has no body hence 'input' is omitted
    const res = await simpleService.todoLogic();
    return res;
  }),
};
