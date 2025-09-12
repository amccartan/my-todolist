import { createTRPCRouter, publicProcedure } from "../trpc";
import {z} from 'zod';

export const helloSomeoneRouter = createTRPCRouter({
    helloSomeone: publicProcedure
    .input(
        z.object({
            name:z.string(),
        })
    )
    .query((opts) => {
        const name = opts.input.name;

        return {
            greeting: `hello ${name} !!!`
        }
    }),
});