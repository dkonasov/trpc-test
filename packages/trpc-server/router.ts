import { initTRPC } from "@trpc/server";
import { EntityDao } from "./dao/entity-dao";
import { z } from "zod";

const app = initTRPC.create();

export const router = app.router({
  list: app.procedure.query(() => {
    const dao = new EntityDao();
    return dao.getList();
  }),
  getById: app.procedure
    .input((input) => {
      if (typeof input !== "number") {
        throw new Error("id should be a number!");
      }

      return input;
    })
    .query(({ input }) => {
      const dao = new EntityDao();
      return dao.getById(input);
    }),
  create: app.procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      const dao = new EntityDao();
      return dao.create(input);
    }),
});

export type AppRouter = typeof router;
