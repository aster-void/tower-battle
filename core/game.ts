import type { EntityID, GameEvent } from "./types";
import type { Entity } from "./entity";
import { todo } from "./utils";

export class GameState {
  playerHealths: Map<string, number>;
  attackTimings: Map<string, number> = new Map();
  entities: Entity[] = [];

  constructor(playerIds: [string, string], defaultHealth: number) {
    this.playerHealths = new Map();
    for (const id of playerIds) {
      this.playerHealths.set(id, defaultHealth);
    }
  }

  // core functions
  process(state: GameState, now: number, events: GameEvent[]): GameState {
    todo();
  }

  // util functions
  locate(id: EntityID): Entity | null {
    for (const e of this.entities) {
      if (id === e.id) return e;
    }
    return null;
  }
}
