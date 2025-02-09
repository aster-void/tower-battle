<script lang="ts">
  const { scores }: { scores: Map<string, number> } = $props();
</script>

<div class="absolute">
  {#each scores as [player, score]}
    <div>
      <span>{player}: {score}</span>
    </div>
  {/each}
</div>
