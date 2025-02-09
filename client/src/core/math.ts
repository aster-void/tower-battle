import type { Coord } from "./base";

export function diffToDeg(a: Coord, b: Coord) {
  // https://stackoverflow.com/questions/36727257/calculating-rotation-degrees-based-on-delta-x-y-movement-of-touch-or-mouse
  const diff = a.diff(b);
  const cos = diff.x / diff.y;
  const rad = Math.acos(cos);
  if (Number.isNaN(rad)) {
    return 0;
  }
  const result = rad * 57.2958;
  return result;
}
