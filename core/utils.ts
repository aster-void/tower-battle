export function panic(message: string): never {
  throw new Error(message);
}

export function todo(): never {
  throw new Error("todo");
}
