import { Entity } from "../interfaces/entity";

let entities: Entity[] = [
  {
    id: 0,
    name: "foo",
  },
  {
    id: 1,
    name: "bar",
  },
];

export class EntityDao {
  getList() {
    return new Promise<Entity[]>((resolve) => {
      setTimeout(() => resolve(entities), 2000);
    });
  }

  getById(id: number) {
    return Promise.resolve(entities.find((val) => val.id === id));
  }
}
