import { FC } from "react";
import { LoaderFunction, useLoaderData, Link } from "react-router-dom";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter, Entity } from "trpc-server";
import { Resource, useResource } from "react-aport";

export const entityDetailLoader: LoaderFunction = ({ params }) => {
  const trpc = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url: import.meta.env.VITE_BACKEND_URL })],
  });

  return new Resource(trpc.getById.query(Number(params.entityId)));
};
export const EntityDetail: FC = () => {
  const entityResource = useLoaderData() as Resource<Entity>;
  const entity = useResource(entityResource);
  return (
    <div>
      <h2>{entity.name}</h2>
      <Link to="/">Back to list</Link>
    </div>
  );
};
