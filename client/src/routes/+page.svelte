<script lang="ts">
  import { onMount } from "svelte";
  import { GameState, profile } from "core";
  import Running from "~/scenes/running.svelte";
  import Finished from "~/scenes/finished.svelte";

  let game = $state(new GameState(profile, ["0", "1"]));

  onMount(() => {
    const id = setInterval(() => {
      if (game.scene.kind === "running") {
        game.tick();
      }
    }, 500);
    return () => {
      clearInterval(id);
    };
  });
</script>

{#if game.scene.kind === "running"}
  <Running {game} />
{:else if game.scene.kind === "finished"}
  <Finished {game} />
{/if}
