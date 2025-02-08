export type EntityKind = {
  name: string;
  image: string;
  health: number;
  range: number;
  damage: number;
  attacker: boolean;
  speed: number;
};

export type Entity = {
  kind: string;
  team: string;
  location: {
    x: number;
    y: number;
  };
};

export type GameEvent = {
  todo: never;
};

export type GameState = {
  playerHealths: Map<string, number>;
  attackTimings: Map<string, number>;
};

export type GameFrame = {
  todo: never;
};
