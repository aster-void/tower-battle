export type EntityID = string;
export type EntityKindID = string;

export type EntityKind = {
  name: EntityKindID;
  size: {
    width: number;
    height: number;
  };
  image: string;
  health: number;
  range: number;
  damage: number;
  attacker: boolean;
  speed: number;
};

export type Entity = {
  id: EntityID;
  kind: EntityKindID;
  team: string;
  pos: {
    x: number;
    y: number;
  };
  // 360 max.
  rotation: number;
};

export type GameEvent =
  | {
      kind: "Fire";
      shooter: EntityID;
      target: EntityID;
    }
  | {
      kind: "TakeDamage";
      target: EntityID;
      amount: number;
    }
  | {
      kind: "Death";
      target: EntityID;
    };

export type GameState = {
  playerHealths: Map<string, number>;
  attackTimings: Map<string, number>;
  entities: Entity[];
};

export type GameFrame = {
  todo: never;
};
