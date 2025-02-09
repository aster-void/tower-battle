<script lang="ts">
  import type { GameState } from "core";

  const {
    game,
    player,
    reset,
  }: { game: GameState; player: string; reset: () => void } = $props();
</script>

{#if game.scene.kind === "finished"}
  <h1 class="text-2xl">
    {#if player === game.scene.winner}
      YOU WIN!
    {:else}
      you lose...
    {/if}
  </h1>

  <button class="btn btn-primary" onclick={reset}>Play again</button>
{/if}
