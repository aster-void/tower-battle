<script lang="ts">
  import { Coord, Entity, GameState } from "core";
  import { onMount } from "svelte";
  import Entities from "~/renderer/Entities.svelte";
  import TableRenderer from "~/renderer/Table.svelte";
  import Scores from "~/renderer/ui/scores.svelte";

  const { game, player }: { game: GameState; player: string } = $props();

  $inspect(game.scores);

  onMount(() => {
    const id = setInterval(() => {
      const opponent = game.players.filter((p) => p !== player)[0];
      const e = new Entity(
        Math.random().toString(),
        "atk1",
        opponent,
        new Coord(0, 0),
        player,
        1,
      );
      game.spawn(e);
    }, 1000);
    return () => clearInterval(id);
  });
</script>

<Scores scores={game.scores} />
<Entities entities={game.entities} ctx={game} />
<TableRenderer table={game.table} />

<button
  class="btn btn-primary"
  onclick={() => {
    for (const p of game.players) {
      if (p === player) continue;
      const e = new Entity(
        Math.random().toString(),
        "atk1",
        player,
        new Coord(1, 5),
        p,
        -1,
      );
      game.spawn(e);
    }
  }}
>
  Spawn
</button>
