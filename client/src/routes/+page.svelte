<script lang="ts">
  import { Coord, Entity, GameState, profile } from "core";
  import { onMount } from "svelte";
  import Entities from "~/renderer/Entities.svelte";
  import TableRenderer from "~/renderer/Table.svelte";

  let game = $state(new GameState(profile, ["0"], 100));

  onMount(() => {
    const id = setInterval(() => {
      game.tick();
    }, 500);
    return () => {
      clearInterval(id);
    };
  });
  $inspect(game.entities);
</script>

<TableRenderer table={game.table} />
<Entities entities={game.entities} />

<button
  class="btn btn-primary"
  onclick={() => {
    game.spawn(new Entity(Math.random().toString(), "a", "0", new Coord(3, 3)));
    game = game;
  }}>Spawn</button
>
