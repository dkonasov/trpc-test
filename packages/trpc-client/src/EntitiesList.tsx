import { FC } from "react";
import { Resource, useResource } from "react-aport";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { useLoaderData } from "react-router-dom";
import type { AppRouter, Entity } from "trpc-server";

export const entitiesListLoader = () => {
  const trpc = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url: import.meta.env.VITE_BACKEND_URL })],
  });

  return new Resource(trpc.list.query());
};

export const EntitiesList: FC = () => {
  const listResource = useLoaderData() as Resource<Entity[]>;
  const entities = useResource(listResource);

  return (
    <>
      {entities.map((entity) => (
        <div key={entity.id}>{entity.name}</div>
      ))}
    </>
  );
};
