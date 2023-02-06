import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { ResponseMeta } from "@trpc/server/dist/http/types";
import { router } from "./router";

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
