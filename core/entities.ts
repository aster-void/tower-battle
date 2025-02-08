import type { EntityKind, EntityKindID } from "./types";
import { panic } from "./utils";

export const attackers: EntityKind[] = [
  {
    name: "a",
    kind: "attacker",
    image: "todo",
    health: 10,
    attacker: true,
    speed: 10,
    reach: 2,
    damage: 1,
    size: {
      width: 1,
      height: 1,
    },
  },
];

export const intercepters: EntityKind[] = [
  {
    name: "b",
    kind: "defender",
    image: "todo",
    health: 1,
    damage: 1,
    reach: 5,
    attacker: false,
    speed: 0,
    size: {
      width: 1,
      height: 1,
    },
  },
];

export const entities: Map<EntityKindID, EntityKind> = (() => {
  const entities = new Map();
  for (const e of attackers.concat(intercepters)) {
    entities.set(e.name, e);
  }
  return entities;
})();

export function getEntityKind(id: EntityKindID): EntityKind {
  return entities.get(id) ?? panic(`EntityKind not found for ${id}`);
}
