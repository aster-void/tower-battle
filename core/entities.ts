import type { Entity, EntityKind, EntityKindID } from "./types";

export const attackers: EntityKind[] = [
  {
    name: "a",
    image: "todo",
    health: 10,
    attacker: true,
    speed: 10,
    range: 2,
    damage: 1,
  },
];

export const intercepters: EntityKind[] = [
  {
    name: "a",
    image: "todo",
    health: 1,
    damage: 1,
    range: 5,
    attacker: false,
    speed: 0,
  },
];

export const entities: Map<EntityKindID, EntityKind> = (() => {
  const entities = new Map();
  for (const e of attackers.concat(intercepters)) {
    entities.set(e.name, e);
  }
  return entities;
})();

export function findTarget(self: Entity, entities: Entity[]) {
  return null;
}
