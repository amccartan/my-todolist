import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "../../db";

export const toDoItemRouter = createTRPCRouter({

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



    toggleToDoItem: publicProcedure
    .input(z.object({ id: z.number(), done: z.boolean() }))
    .mutation(async ({ input }) => {
      const updated = await db.toDoItem.update({
        where: { id: input.id },
        data: { done: input.done },
      });
      return { toDoItem: updated };
    }),

    

    deleteToDoItem: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.toDoItem.delete({
        where: { id: input.id },
      });
      return { success: true };
    }),
});