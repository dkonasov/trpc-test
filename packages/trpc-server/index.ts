import { initTRPC } from "@trpc/server";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

interface Entity {
  id: number;
  name: string;
}

const app = initTRPC.create();

const router = app.router({
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

createHTTPServer({ router }).listen(3000);
