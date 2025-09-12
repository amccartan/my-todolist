import { createTRPCRouter, publicProcedure } from "../trpc";

export const helloWorldRouter = createTRPCRouter({
    helloWorld: publicProcedure.query(() => {
        return {message: "hello world :)"}
    }),
});