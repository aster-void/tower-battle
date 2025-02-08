<script lang="ts">
  import type { Entity } from "core";
  import EntityRenderer from "./entity.svelte";
  type Props = {
    entities: Entity[];
  };
  const { entities }: Props = $props();
</script>

{#each entities as entity}
  <EntityRenderer {entity} />
{/each}
