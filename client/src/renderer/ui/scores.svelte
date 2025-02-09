<script lang="ts">
  const { scores }: { scores: { you: number; cp: number } } = $props();
</script>

<div class="absolute text-xl bg-black-500">
  <div>You: {scores.you}</div>
  <div>CP: {scores.cp}</div>
</div>
