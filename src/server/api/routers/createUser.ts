import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "~/server/db";

export const createUserRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await db.user.create({ //run 'npx prisma generate' to stop 'user' throwing an error
        data: {
          name: input.name,
        },
      });

      return {
        message: `the user '${user.name}' was created successfully!!`,
        user,
      };
    }),
});