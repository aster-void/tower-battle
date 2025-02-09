import { Coord } from "./base";
import { Walkable } from "./path";
import type { EntityID, EntityKind, EntityKindID } from "./types";
import type { GameState } from "./game.svelte";
import { getEntityKind } from "./entities";
import { assert, panic } from "./utils";
import { diffToDeg } from "./math";

export class Entity {
  id: EntityID;
  kind: EntityKind;
  team: string;
  pos: Coord = $state(new Coord(0, 0));
  // 360 max.
  rotation: number = $state(0);
  health: number;
  walk: Walkable | null;

  constructor(
    id: EntityID,
    kind: EntityKindID,
    team: string,
    pos: Coord,
    public targetPlayer: string | null,
    direction: number,
  ) {
    this.id = id;
    this.kind = getEntityKind(kind);
    this.team = team;
    this.pos = pos;
    this.rotation = 0;
    this.health = this.kind.health;
    this.walk = this.targetPlayer
      ? new Walkable(this.targetPlayer, direction)
      : null;
  }

  tick(ctx: GameState) {
    const t = this.findTarget(ctx);
    const target = t ? ctx.locate(t) : null;
    if (target) {
      // attack
      this.faceAt(target.pos);
      ctx.events.push({
        kind: "TakeDamage",
        target: target.id,
        amount: this.kind.damage,
      });
    } else if (this.kind.kind === "attacker") {
      // walk
      if (!this.walk) panic("you shouldn't walk a non-walker");
      const result = this.walk.step(ctx.table.path, this.kind.speed);
      if (result.kind === "goal") {
        ctx.events.push({
          kind: "Goal",
          target: this.id,
          sourcePlayer: this.team,
          targetPlayer: result.to,
        });
      } else {
        this.pos = result.pos;
        this.rotate(result.facing);
      }
    } else {
      // stay = noop
    }
  }

  findTarget(ctx: GameState): EntityID | null {
    const reachable = ctx.entities
      .filter((e) => e.team !== this.team)
      .map((e) => ({
        entity: e,
        dist: this.pos.distance(e.pos),
      }))
      .filter((t) => t.dist < this.kind.reach)
      .sort((a, b) => a.dist - b.dist)
      .map((t) => t.entity);
    return reachable[0]?.id ?? null;
  }
  faceAt(other: Coord) {
    this.rotate(diffToDeg(this.pos, other) + 90);
  }
  rotate(rotation: number) {
    this.rotation = rotation;
  }
}
