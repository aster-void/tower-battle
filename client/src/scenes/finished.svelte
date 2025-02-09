<script lang="ts">
  import type { GameState } from "core";

  const { game }: { game: GameState } = $props();
</script>

{#if game.scene.kind === "finished"}
  <h1 class="text-2xl">
    {game.scene.winner} WIN!
  </h1>
{/if}
