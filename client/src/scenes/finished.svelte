<script lang="ts">
  import type { GameState } from "core";

  const { game, player }: { game: GameState; player: string } = $props();
</script>

{#if game.scene.kind === "finished"}
  <h1 class="text-2xl">
    {#if player === game.scene.winner}
      YOU WIN!
    {:else}
      you lose...
    {/if}
  </h1>
{/if}
