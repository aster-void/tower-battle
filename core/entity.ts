import { Coord } from "./base";
import { Walkable } from "./path";
import type { EntityID, GameEvent, EntityKind, EntityKindID } from "./types";
import type { GameState } from "./game";
import { getEntityKind } from "./entities";

export class Entity {
  id: EntityID;
  kind: EntityKind;
  team: string;
  pos: Coord;
  // 360 max.
  rotation: number;
  walkable: Walkable = new Walkable();

  constructor(id: EntityID, kind: EntityKindID, team: string, pos: Coord) {
    this.id = id;
    this.kind = getEntityKind(kind);
    this.team = team;
    this.pos = pos;
    this.rotation = 0;
  }

  tick(ctx: GameState): GameEvent[] {
    const events: GameEvent[] = [];
    const t = this.findTarget(ctx);
    const target = t ? ctx.locate(t) : null;
    if (target) {
      // attack
      this.faceAt(target.pos);
    } else if (this.kind.kind === "attacker") {
      // walk
      const result = this.walkable.step(ctx.table.path, this.kind.speed);
      if (result === "goal") {
        events.push({
          kind: "Goal",
          target: this.id,
          goalingPlayer: this.team,
        });
      } else {
        this.walkable = result;
      }
    } else {
      // stay = noop
    }
    return events;
  }

  findTarget(ctx: GameState): EntityID | null {
    const reachable = ctx.entities
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
    this.rotation = diffToDeg(this.pos, other);
  }
}

function diffToDeg(a: Coord, b: Coord) {
  // https://stackoverflow.com/questions/36727257/calculating-rotation-degrees-based-on-delta-x-y-movement-of-touch-or-mouse
  const diff = a.diff(b);
  const cos = diff.distance(new Coord(0, 0)) / diff.x;
  const rad = Math.acos(cos);
  return rad * 57.2958;
}
