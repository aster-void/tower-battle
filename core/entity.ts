import type { Coord } from "./base";
import type { EntityID, EntityKind, EntityKindID } from "./types";
import type { GameState } from "./game";
import { todo } from "./utils";
import { entities, getEntityKind } from "./entities";

export class Entity {
  id: EntityID;
  kind: EntityKind;
  team: string;
  pos: Coord;
  // 360 max.
  rotation: number;

  constructor(id: EntityID, kind: EntityKindID, team: string, pos: Coord) {
    this.id = id;
    this.kind = getEntityKind(kind);
    this.team = team;
    this.pos = pos;
    this.rotation = 0;
  }

  tick(ctx: GameState) {
    const t = this.findTarget(ctx);
    const target = t ? ctx.locate(t) : null;
    if (target) {
      // attack
      this.faceAt(target.pos);
    } else if (this.kind.kind === "attacker") {
      // walk or stay
    } else {
    }
  }

  findTarget(ctx: GameState): EntityID | null {
    ctx.entities.filter((e) => e.pos.distance(this.pos) <= this.kind.reach);
    todo();
  }
  faceAt(pos: Coord) {}
}
