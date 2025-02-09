export type EntityID = string;
export type EntityKindID = string;

export type EntityKind = {
  name: EntityKindID;
  kind: "attacker" | "defender";
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
};

export type GameEvent =
  | {
      kind: "TakeDamage";
      target: EntityID;
      amount: number;
    }
  | {
      kind: "Death";
      target: EntityID;
    }
  | {
      kind: "Goal";
      target: EntityID;
      sourcePlayer: string;
      targetPlayer: string;
    };
