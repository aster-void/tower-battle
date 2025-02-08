import { panic, todo } from "./utils";
todo;

export class Coord {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distance(other: Coord): number {
    return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);
  }
  eq(other: Coord) {
    return this.x === other.x && this.y === other.y;
  }
}
export class Cell {
  constructor(
    public readonly coord: Coord,
    public kind: "path" | "grass",
  ) {}
}

/**
  first coord = start
  last coord = goal
*/
export class Path {
  constructor(public corners: Coord[]) {
    this.corners = corners;
  }
  *window(): Generator<[Coord, Coord]> {
    for (let i = 0; i < this.corners.length - 1; i++) {
      yield [this.corners[i], this.corners[i + 1]];
    }
  }
  length(): number {
    let sum = 0;
    for (const [a, b] of this.window()) {
      sum += a.distance(b);
    }
    return sum;
  }
  *walk(): Generator<Coord> {
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
        console.log(b, iter);
      }
    }
  }
}

const path_profiles = [
  {
    size: {
      w: 6,
      h: 6,
    },
    path: new Path([
      new Coord(1, 0),
      new Coord(1, 1),
      new Coord(4, 1),
      new Coord(4, 4),
      new Coord(1, 4),
      new Coord(1, 5),
    ]),
  },
];
export const profile = path_profiles[0];

export class Table {
  path: Path;
  cells: Cell[][];
  constructor(
    public readonly width: number,
    public readonly height: number,
    path: Path,
  ) {
    this.path = path;
    this.cells = Array.from({ length: height })
      .fill(null)
      .map((_, y) =>
        Array.from({ length: width })
          .fill(null)
          .map((_, x) => new Cell(new Coord(x, y), "grass")),
      );
    for (const cell of path.walk()) {
      this.cells[cell.y][cell.x] = new Cell(cell, "path");
    }
  }
}
