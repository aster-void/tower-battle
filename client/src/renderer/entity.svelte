<script lang="ts">
  import { CELL_SIZE } from "$lib/states.svelte";
  import type { Entity } from "core";
  type Props = {
    entity: Entity;
  };
  const { entity }: Props = $props();
  const kind = entity.kind;
</script>

<img
  src={kind.image}
  height={kind.size.height * CELL_SIZE.value}
  width={kind.size.width * CELL_SIZE.value}
  style="position: absolute"
  style:top={entity.pos.y * CELL_SIZE.value}
  style:left={entity.pos.x * CELL_SIZE.value}
  style:height="{kind.size.height * CELL_SIZE.value}px"
  style:width="{kind.size.width * CELL_SIZE.value}px"
  style:transform="rotate:{entity.rotation}deg"
  alt=""
/>
