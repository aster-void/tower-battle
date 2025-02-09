<script lang="ts">
  import { CELL_SIZE } from "$lib/states.svelte";
  import type { Entity, GameState } from "core";
  type Props = {
    entity: Entity;
    ctx: GameState;
  };
  const { entity, ctx }: Props = $props();
  const kind = entity.kind;
</script>

<img
  onclick={() => {
    ctx.events.push({
      kind: "TakeDamage",
      target: entity.id,
      amount: 4,
    });
  }}
  src={kind.image}
  height={kind.size.height * CELL_SIZE.value}
  width={kind.size.width * CELL_SIZE.value}
  style="
    position: absolute;
    top: {entity.pos.y * CELL_SIZE.value}px;
    left: {entity.pos.x * CELL_SIZE.value}px;
    height: {kind.size.height * CELL_SIZE.value}px;
    width: {kind.size.width * CELL_SIZE.value}px;
    transform: rotate({Math.floor(entity.rotation)}deg);
  "
  draggable="false"
  alt=""
/>

<style>
  img {
    user-select: none;
  }
</style>
