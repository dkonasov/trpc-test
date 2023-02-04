import { FC } from "react";
import { Resource, useResource } from "react-aport";
import type { Entity } from "trpc-server";

export interface EntitiesListProps {
  listResource: Resource<Entity[]>;
}

export const EntitiesList: FC<EntitiesListProps> = (props) => {
  const { listResource } = props;
  const entities = useResource(listResource);

  return (
    <>
      {entities.map((entity) => (
        <div key={entity.id}>{entity.name}</div>
      ))}
    </>
  );
};
