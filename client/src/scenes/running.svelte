<script lang="ts">
  import { Coord, Entity, GameState } from "core";
  import Entities from "~/renderer/Entities.svelte";
  import TableRenderer from "~/renderer/Table.svelte";
  import Scores from "~/renderer/ui/scores.svelte";

  const { game }: { game: GameState } = $props();
</script>

<Scores scores={game.scores} />
<Entities entities={game.entities} ctx={game} />
<TableRenderer table={game.table} />

<button
  class="btn btn-primary"
  onclick={() => {
    const e = new Entity(
      Math.random().toString(),
      "atk1",
      "0",
      new Coord(3, 3),
      "1",
    );
    game.spawn(e);
    e.rotate(Math.random() * 360);
  }}
>
  Spawn
</button>
