import { GameState } from "./game.svelte";
import { profile } from "./table";

const state = new GameState(profile, "0", ["0", "1"]);
state.tick();
