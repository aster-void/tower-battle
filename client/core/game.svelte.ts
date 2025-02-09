import type { EntityID, GameEvent } from "./types";
import type { Entity } from "./entity";
import { panic, assert } from "./utils";
import { type PathProfile, Table } from "./table";

export class GameState {
  playerHealths: Map<string, number>;
  attackTimings: Map<string, number> = new Map();
  entities: Entity[] = $state([]);
  table: Table;
  timer = 0;

  constructor(prof: PathProfile, playerIds: string[], defaultHealth: number) {
    this.table = new Table(prof.size.w, prof.size.w, prof.path);
    this.playerHealths = new Map();
    for (const id of playerIds) {
      this.playerHealths.set(id, defaultHealth);
    }
  }

  // core functions
  tick() {
    this.timer++;
    const events: GameEvent[] = [];
    for (const entity of this.entities) {
      events.push(...entity.tick(this));
    }
    this.process(events);
  }
  process(events: GameEvent[]) {
    // perf: avoid cloning entities on every event
    const newEntities: (Entity | null)[] = [...this.entities];
    for (const event of events) {
      switch (event.kind) {
        case "Fire":
        case "TakeDamage":
        case "Death": {
          const idx = this.entities.findIndex((v) => v.id === event.target);
          if (idx) {
            newEntities[idx] = null;
          }
          break;
        }
        case "Goal": {
          assert(this.playerHealths.has(event.goalingPlayer));
          this.playerHealths.set(
            event.goalingPlayer,
            this.playerHealths.get(event.goalingPlayer) ||
              panic("shouldn't happen"),
          );
          break;
        }
        default:
          event satisfies never;
      }
    }
    this.entities = newEntities.filter((e) => e !== null);
  }

  // APIs
  spawn(entity: Entity) {
    this.entities.push(entity);
    console.log("spawned", entity.kind);
  }

  // util functions
  locate(id: EntityID): Entity | null {
    for (const e of this.entities) {
      if (id === e.id) return e;
    }
    return null;
  }
}
