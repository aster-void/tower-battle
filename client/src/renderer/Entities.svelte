<script lang="ts">
  import type { Entity } from "core";
  import EntityRenderer from "./entity.svelte";
  type Props = {
    entities: Entity[];
  };
  const { entities }: Props = $props();
</script>

<div id="entity-hook">
  {#each entities as entity}
    <EntityRenderer {entity} />
  {/each}
</div>
