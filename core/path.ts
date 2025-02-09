import { assert, panic } from "./utils";
import { Coord } from "./base";

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
        yield iter;
        iter.y += direction[0];
        iter.x += direction[1];
      }
    }
  }
  position(w: Walkable): Coord {
    assert(w.progress >= 0);
    let progress = w.progress;
    const path = this.walk();
    while (progress >= 1) {
      path.next();
      progress--;
    }
    const a = path.next().value || panic("fix this 1", w, this);
    const b = path.next().value || panic("fix it 2", w, this);
    return a.weighted(b, progress);
  }
}

export class Walkable {
  public progress = 0;
  step(path: Path, speed: number): Walkable | "goal" {
    const next = new Walkable();
    next.progress = this.progress;
    next.progress += speed;
    return next;
  }
}
