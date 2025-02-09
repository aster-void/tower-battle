import { assert, panic } from "./utils";
import { Coord } from "./base";
import { diffToDeg } from "./math";

/**
  first coord = start
  last coord = goal
*/
export class Path {
  public readonly length: number;
  constructor(public corners: Coord[]) {
    this.corners = corners;

    // done init, setup cache
    this.length = this._length();
  }
  *window(): Generator<[Coord, Coord]> {
    for (let i = 0; i < this.corners.length - 1; i++) {
      yield [this.corners[i], this.corners[i + 1]];
    }
  }
  private _length(): number {
    let sum = 0;
    for (const [a, b] of this.window()) {
      sum += a.distance(b);
    }
    return sum;
  }
  *walk(): Generator<Coord, undefined, undefined> {
    for (const [a, b] of this.window()) {
      const direction =
        a.x === b.x
          ? a.y < b.y
            ? [1, 0]
            : [-1, 0]
          : a.y === b.y
            ? a.x < b.x
              ? [0, 1]
              : [0, -1]
            : panic("neither x-x or y-y are equal");

      const iter = new Coord(a.x, a.y);
      while (!b.eq(iter)) {
        yield iter.copy();
        iter.y += direction[0];
        iter.x += direction[1];
      }
    }
  }
  position(posititon: number): Coord {
    assert(posititon >= 0);
    let p = posititon;
    const path = this.walk();
    while (p >= 1) {
      path.next();
      p--;
    }
    const a = path.next().value || panic("fix this 1", posititon, this);
    const b = path.next().value || panic("fix it 2", posititon, this);
    return b.weighted(a, p);
  }
  facing(w: Walkable): number {
    assert(w.progress >= 0);
    let progress = w.progress;
    const path = this.walk();
    while (progress >= 1) {
      path.next();
      progress--;
    }
    const a = path.next().value || panic("fix this 1", w, this);
    const b = path.next().value || panic("fix it 2", w, this);
    return diffToDeg(a, b) + 90 * w.direction;
  }
}

export class Walkable {
  progress = 0;
  constructor(
    public target: string,
    public direction: number,
  ) {
    assert(direction === 1 || direction === -1, "direction must be 1 or -1");
  }
  step(
    path: Path,
    speed: number,
  ): { kind: "ok"; pos: Coord; facing: number } | { kind: "goal"; to: string } {
    this.progress += speed;
    if (this.progress >= path.length - 1) {
      return {
        kind: "goal",
        to: this.target,
      };
    }
    return {
      kind: "ok",
      pos:
        this.direction > 0
          ? path.position(this.progress)
          : path.position(path.length - this.progress - 1),
      facing: path.facing(this),
    };
  }
}
