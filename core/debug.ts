import { GameState } from "./game";
import { profile } from "./table";

const state = new GameState(profile, ["0"], 100);
state.tick();
