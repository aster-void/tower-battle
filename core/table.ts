import { Coord } from "./base";
import { Path } from "./path";

export class Cell {
  constructor(
    public readonly coord: Coord,
    public kind: "path" | "grass",
  ) {}
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
