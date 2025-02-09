<script lang="ts">
  import type { GameState } from "core";

  const {
    game,
    player,
    reset,
  }: { game: GameState; player: string; reset: () => void } = $props();
</script>

{#if game.scene.kind === "finished"}
  <h1 class="text-5xl text-center font-bold mt-20">
    {#if player === game.scene.winner}
      YOU WIN!
    {:else}
      you lose...
    {/if}
  </h1>

  <div class="flex flex-row">
    <button class="btn btn-primary" onclick={reset}>Play again</button>
  </div>
{/if}
