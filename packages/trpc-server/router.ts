import { initTRPC } from "@trpc/server";
import { EntityDao } from "./dao/entity-dao";

const app = initTRPC.create();

export const router = app.router({
  list: app.procedure.query(() => {
    const dao = new EntityDao();
    return dao.getList();
  }),
});

export type AppRouter = typeof router;
