import type { Entity } from "./types";

export const entities: Entity[] = [].map((e, idx) => ({
	id: idx,
	todo: "hi",
}));
