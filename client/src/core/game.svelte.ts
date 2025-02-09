import type { EntityID, GameEvent } from "./types";
import type { Entity } from "./entity.svelte";
import { panic, assert } from "./utils";
import { type GameProfile, Table } from "./table";

export class GameState {
  players: string[];
  scores: Map<string, number> = $state(new Map());
  // TODO: make it more flexible and non-user-dependent
  player: string;
  money = $state(0);
  entities: Entity[] = $state([]);
  scene: { kind: "running" } | { kind: "finished"; winner: string } = $state({
    kind: "running",
  });
  table: Table;
  profile: GameProfile;
  timer = 0;
  events: GameEvent[] = [];

  // events
  public onScoreChange = (_scores: Map<string, number>) => {};

  constructor(prof: GameProfile, player: string, players: string[]) {
    this.player = player;
    this.players = players;
    this.profile = prof;
    this.table = new Table(prof.size.w, prof.size.w, prof.path);
    for (const id of players) {
      this.scores.set(id, prof.defaultHealth);
    }
  }

  // core functions
  tick() {
    this.timer++;
    this.money += this.profile.moneyGain;
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
        case "TakeDamage": {
          const e = event.target;
          if (e) {
            e.health -= event.amount;
            if (e.health <= 0) {
              processingEvents.push({
                kind: "Death",
                target: e,
                killer: event.by,
              });
            }
          }
          break;
        }
        case "Goal": {
          const goalScore = event.target.kind.goalScore;
          processingEvents.push({
            kind: "Death",
            target: event.target,
            killer: null,
          });
          assert(this.scores.has(event.targetPlayer), "target");
          assert(this.scores.has(event.sourcePlayer), "source");
          this.scores.set(
            event.sourcePlayer,
            this.scores.get(event.sourcePlayer) ??
              panic("shouldn't happen") + goalScore,
          );

          const nextHealth =
            (this.scores.get(event.targetPlayer) ?? panic("shouldn't happen")) -
            goalScore;
          if (nextHealth <= 0) {
            this.scene = {
              kind: "finished",
              winner: event.sourcePlayer,
            };
            return;
          }
          this.scores.set(event.targetPlayer, nextHealth);
          this.onScoreChange(this.scores);
          break;
        }
        case "Death": {
          const idx = newEntities.findIndex((v) => v?.id === event.target.id);
          if (idx != null) {
            newEntities[idx] = null;
          }
          if (event.killer?.team === this.player) {
            this.money += event.target.kind.killScore;
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
