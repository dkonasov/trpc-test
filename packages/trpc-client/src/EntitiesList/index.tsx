import { FC } from "react";
import { Resource, useResource } from "react-aport";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { Link, useLoaderData } from "react-router-dom";
import type { AppRouter, Entity } from "trpc-server";
import styles from "./EntitiesList.module.css";

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
    <div className={styles.root}>
      {entities.map((entity) => (
        <Link to={`/entities/${entity.id}`} key={entity.id}>
          {entity.name}
        </Link>
      ))}
    </div>
  );
};
