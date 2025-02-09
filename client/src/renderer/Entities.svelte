<script lang="ts">
  import type { Entity, GameState } from "core";
  import EntityRenderer from "./entity.svelte";
  type Props = {
    entities: Entity[];
    ctx: GameState;
  };
  const { entities, ctx }: Props = $props();
</script>

<div id="entity-hook" class="relative">
  {#each entities as entity}
    <EntityRenderer {entity} {ctx} />
  {/each}
</div>
