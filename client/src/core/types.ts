import type { Entity } from "./entity.svelte";

export type EntityID = string;
export type EntityKindID = string;

export type EntityKind = {
  name: EntityKindID;
  kind: "attacker" | "defender";
  cost: number;
  size: {
    width: number;
    height: number;
  };
  image: string;
  health: number;
  reach: number;
  damage: number;
  attacker: boolean;
  speed: number;
  goalScore: number;
  killScore: number;
};

export type GameEvent =
  | {
      kind: "TakeDamage";
      target: Entity;
      by: Entity | null;
      amount: number;
    }
  | {
      kind: "Death";
      target: Entity;
      killer: Entity | null; // team id
    }
  | {
      kind: "Goal";
      target: Entity;
      sourcePlayer: string;
      targetPlayer: string;
    };
