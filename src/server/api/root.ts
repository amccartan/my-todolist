import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { helloWorldRouter } from "./routers/helloWorld";
import { createUserRouter } from "./routers/createUser";
import { toDoItemRouter } from "./routers/toDoItem";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  helloWorld: helloWorldRouter,
  createUser: createUserRouter,
  createToDoItem: toDoItemRouter,
  deleteToDoItem: toDoItemRouter,
  toggleToDoItem: toDoItemRouter,
  toDoItem:toDoItemRouter, //needed so that 'api.toDoItem.toggleToDoItem.useMutation()' works in the useToDoList.ts file!!
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

