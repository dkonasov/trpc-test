import { FC, Suspense } from "react";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "trpc-server";
import { EntitiesList } from "./EntitiesList";
import { Resource } from "react-aport";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: import.meta.env.VITE_BACKEND_URL })],
});

const listResource = new Resource(trpc.list.query());

export const App: FC = () => {
  return (
    <Suspense fallback="Loading...">
      <EntitiesList listResource={listResource} />
    </Suspense>
  );
};
