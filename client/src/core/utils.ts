export function panic(message: string, ...logs: unknown[]): never {
  console.error(message);
  console.log(logs);
  throw new Error(message);
}

export function todo(): never {
  throw new Error("todo");
}

export function assert(cond: boolean, ...messages: unknown[]): cond is true {
  if (!cond) {
    console.error(...messages);
    panic("Assertion failed: expected true but got false.");
  }
  return true;
}
