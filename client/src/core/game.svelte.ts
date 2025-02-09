import type { EntityID, GameEvent } from "./types";
import type { Entity } from "./entity.svelte";
import { panic, assert, todo } from "./utils";
import { type GameProfile, Table } from "./table";

export class GameState {
  scores: Map<string, number> = $state(new Map());
  entities: Entity[] = $state.raw([]);
  scene: { kind: "running" } | { kind: "finished"; winner: string } = $state({
    kind: "running",
  });
  table: Table;
  profile: GameProfile;
  timer = 0;
  events: GameEvent[] = [];

  constructor(prof: GameProfile, playerIds: string[]) {
    this.profile = prof;
    this.table = new Table(prof.size.w, prof.size.w, prof.path);
    this.scores = new Map();
    for (const id of playerIds) {
      this.scores.set(id, prof.defaultHealth);
    }
  }

  // core functions
  tick() {
    this.timer++;
    for (const entity of this.entities) {
      entity.tick(this);
    }
    this.processEvents();
  }

  processEvents() {
    // perf: avoid cloning entities on every event
    const newEntities: (Entity | null)[] = [...this.entities];
    const processingEvents = this.events;
    this.events = [];
    for (let i = 0; i < processingEvents.length; i++) {
      const event = processingEvents[i];
      switch (event.kind) {
        case "Fire": {
          todo();
          break;
        }
        case "TakeDamage": {
          const e = this.entities.find((v) => v.id === event.target);
          if (e) {
            console.log("taking damage...");
            e.health -= event.amount;
            console.log("new health:", e.health);
            if (e.health <= 0) {
              processingEvents.push({
                kind: "Death",
                target: e.id,
              });
            }
          }
          break;
        }
        case "Goal": {
          processingEvents.push({
            kind: "Death",
            target: event.target,
          });
          assert(this.scores.has(event.targetPlayer));
          assert(this.scores.has(event.sourcePlayer));
          this.scores.set(
            event.sourcePlayer,
            this.scores.get(event.sourcePlayer) ??
              panic("shouldn't happen") + this.profile.goalScore,
          );

          const nextHealth =
            (this.scores.get(event.targetPlayer) ?? panic("shouldn't happen")) -
            this.profile.goalScore;
          if (nextHealth <= 0) {
            this.scene = {
              kind: "finished",
              winner: event.sourcePlayer,
            };
            return;
          }
          this.scores.set(event.targetPlayer, nextHealth);
          break;
        }
        case "Death": {
          const idx = newEntities.findIndex((v) => v?.id === event.target);
          console.log("idx", idx);
          if (idx != null) {
            newEntities[idx] = null;
            console.log("debug", newEntities);
            console.log(
              "debug",
              newEntities.filter((e) => e !== null),
            );
          }
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
  }

  // util functions
  locate(id: EntityID): Entity | null {
    for (const e of this.entities) {
      if (id === e.id) return e;
    }
    return null;
  }
}
