import { DefaultErrorShape, initTRPC } from "@trpc/server";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { ResponseMeta } from "@trpc/server/dist/http/types";
import { TRPCErrorResponse } from "@trpc/server/dist/rpc";

export interface Entity {
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

createHTTPServer({
  router,
  responseMeta: (meta) => {
    const result: ResponseMeta = {
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-headers": "*",
      },
    };

    if (
      meta.errors.length &&
      meta.errors[0].code === "METHOD_NOT_SUPPORTED" &&
      meta.errors[0].message.toLowerCase().includes("options")
    ) {
      result.status = 200;
    }
    return result;
  },
}).listen(3000);

export type AppRouter = typeof router;
