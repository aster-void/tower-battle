<script lang="ts">
  import { CELL_SIZE } from "$lib/states.svelte";
  import type { Entity, GameState } from "core";
  type Props = {
    entity: Entity;
    ctx: GameState;
  };
  const { entity }: Props = $props();
  const kind = entity.kind;
</script>

<img
  id={entity.id}
  src={kind.image}
  height={kind.size.height * CELL_SIZE.value}
  width={kind.size.width * CELL_SIZE.value}
  style="
    position: absolute;
    top: {entity.pos.y * CELL_SIZE.value}px;
    left: {entity.pos.x * CELL_SIZE.value}px;
    height: {kind.size.height * CELL_SIZE.value}px;
    width: {kind.size.width * CELL_SIZE.value}px;
    transform: rotate({Math.floor((entity.rotation + 720) % 360)}deg);
  "
  draggable="false"
  alt=""
/>

<style>
  img {
    user-select: none;
  }
</style>
