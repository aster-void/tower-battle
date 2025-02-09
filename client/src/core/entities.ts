import type { EntityKind, EntityKindID } from "./types";
import { panic } from "./utils";

export const attackers: EntityKind[] = [
  {
    name: "atk1",
    kind: "attacker",
    image: "/red.png",
    health: 10,
    attacker: true,
    speed: 0.3,
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
    name: "def1",
    kind: "defender",
    image: "/red.png",
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
