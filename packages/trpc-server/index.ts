import { initTRPC } from "@trpc/server";
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const app = initTRPC.create();

const router = app.router({});

createHTTPServer({router}).listen(3000);

