import { initTRPC } from "@trpc/server";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { ResponseMeta } from "@trpc/server/dist/http/types";
import { Entity } from "./interfaces/entity";

const app = initTRPC.create();

export const router = app.router({
  list: app.procedure.query(() => {
    return new Promise<Entity[]>((resolve) => {
      setTimeout(
        () =>
          resolve([
            {
              id: 0,
              name: "foo",
            },
            {
              id: 1,
              name: "bar",
            },
          ]),
        2000
      );
    });
  }),
});

export type AppRouter = typeof router;
