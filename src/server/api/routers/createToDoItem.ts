import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "../../db";

export const createToDoItemRouter = createTRPCRouter({
  createToDoItem: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const toDoItem = await db.toDoItem.create({ //run 'npx prisma generate' to stop 'user' throwing an error
        data: {
          text: input.text,
        },
      });

      return {
        toDoItem,
      };
    }),
});