<script lang="ts">
  const { scores }: { scores: { you: number; cp: number } } = $props();
</script>

<div class="absolute">
  <div>You: {scores.you}</div>
  <div>CP: {scores.cp}</div>
</div>
