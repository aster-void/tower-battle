<script lang="ts">
  import "../global.css";
  const { children } = $props();
</script>

<svelte:head>
  <title>Phaser Svelte Template</title>
</svelte:head>

{@render children()}
