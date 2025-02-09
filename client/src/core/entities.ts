import type { EntityKind, EntityKindID } from "./types";
import { panic } from "./utils";

export const attackers: EntityKind[] = [
  {
    name: "atk1",
    kind: "attacker",
    image: "/red.png",
    health: 10,
    attacker: true,
    speed: 0.1,
    reach: 2,
    damage: 1,
    goalScore: 10,
    killScore: 1,
    cost: 100,
    size: {
      width: 0.7,
      height: 0.7,
    },
  },
  {
    name: "atk2",
    kind: "attacker",
    image: "/red.png",
    health: 100,
    attacker: true,
    cost: 200,
    speed: 0.05,
    reach: 1.5,
    damage: 1,
    goalScore: 20,
    killScore: 10,
    size: {
      width: 1,
      height: 1,
    },
  },
  {
    name: "atk3",
    kind: "attacker",
    image: "/red.png",
    health: 10,
    cost: 50,
    attacker: true,
    speed: 0.5,
    reach: 1,
    damage: 1,
    goalScore: 2,
    killScore: 1,
    size: {
      width: 0.2,
      height: 0.2,
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
    goalScore: 0,
    killScore: 0,
    cost: 300,
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
