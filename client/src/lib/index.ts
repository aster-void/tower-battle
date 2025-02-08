import { hc } from "hono/client";
import type app from "server";

export function panic(message: string, ...info: unknown[]): never {
  console.error(message);
  console.error(info);
  throw new Error(message);
}
export function env(name: string): string {
  return import.meta.env[name] ?? panic(`env var ${name} not found`);
}

export const client = hc<typeof app>(env("VITE_API_ENDPOINT"));
