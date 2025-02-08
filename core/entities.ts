import type { Entity, EntityKind } from "./types";

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

export function findTarget(self: Entity, entities: Entity[]) {
  return null;
}
