export class Coord {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  copy() {
    return new Coord(this.x, this.y);
  }

  distance(other: Coord): number {
    return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);
  }
  diff(other: Coord): Coord {
    return new Coord(other.x - this.x, other.y - this.y);
  }
  eq(other: Coord) {
    return this.x === other.x && this.y === other.y;
  }
  /** 0 <= this_weight <= 1 **/
  weighted(other: Coord, this_weight: number): Coord {
    const other_weight = 1 - this_weight;
    return new Coord(
      this.x * this_weight + other.x * other_weight,
      this.y * this_weight + other.y * other_weight,
    );
  }
}
