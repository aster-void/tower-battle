<script lang="ts">
  import { onMount } from "svelte";
  import { GameState, profile } from "core";
  import Running from "~/scenes/running.svelte";
  import Finished from "~/scenes/finished.svelte";

  const player = Math.random().toString();
  const opponent = Math.random().toString();
  const game = $state(new GameState(profile, [player, opponent]));

  onMount(() => {
    const id = setInterval(() => {
      if (game.scene.kind === "running") {
        game.tick();
      }
    }, 50);
    return () => {
      clearInterval(id);
    };
  });
</script>

{#if game.scene.kind === "running"}
  <Running {game} {player} />
{:else if game.scene.kind === "finished"}
  <Finished {game} {player} />
{/if}
