import { Coord } from "./base";
import { Walkable } from "./path";
import type { EntityID, EntityKind, EntityKindID } from "./types";
import type { GameState } from "./game.svelte";
import { getEntityKind } from "./entities";
import { assert, panic } from "./utils";

export class Entity {
  id: EntityID;
  kind: EntityKind;
  team: string;
  pos: Coord = $state(new Coord(0, 0));
  // 360 max.
  rotation: number;
  health: number;
  walk: Walkable | null;

  constructor(
    id: EntityID,
    kind: EntityKindID,
    team: string,
    pos: Coord,
    public targetPlayer: string | null,
  ) {
    this.id = id;
    this.kind = getEntityKind(kind);
    this.team = team;
    this.pos = pos;
    this.rotation = 0;
    this.health = this.kind.health;
    this.walk = this.targetPlayer ? new Walkable(this.targetPlayer) : null;
  }

  tick(ctx: GameState) {
    const t = this.findTarget(ctx);
    const target = t ? ctx.locate(t) : null;
    console.log("ticking", this.id);
    if (target) {
      // attack
      console.log("attacking", target.kind.name);
      this.faceAt(target.pos);
    } else if (this.kind.kind === "attacker") {
      // walk
      console.log("walking");
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
      }
    } else {
      console.log("noop");
      // stay = noop
    }
  }

  findTarget(ctx: GameState): EntityID | null {
    const reachable = ctx.entities
      .map((e) => ({
        entity: e,
        dist: this.pos.distance(e.pos),
      }))
      .filter((t) => t.entity.team !== this.team && t.dist < this.kind.reach)
      .sort((a, b) => a.dist - b.dist)
      .map((t) => t.entity);
    return reachable[0]?.id ?? null;
  }
  faceAt(other: Coord) {
    this.rotate(diffToDeg(this.pos, other));
  }
  rotate(rotation: number) {
    this.rotation = rotation;
  }
}

function diffToDeg(a: Coord, b: Coord) {
  // https://stackoverflow.com/questions/36727257/calculating-rotation-degrees-based-on-delta-x-y-movement-of-touch-or-mouse
  const diff = a.diff(b);
  const cos = diff.distance(new Coord(0, 0)) / diff.x;
  const rad = Math.acos(cos);
  return rad * 57.2958;
}
