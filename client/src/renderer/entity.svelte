<script lang="ts">
  import { CELL_SIZE } from "$lib/states.svelte";
  import type { Entity } from "core/types";
  import { entities } from "core/entities";
  import { panic } from "~/lib";
  type Props = {
    entity: Entity;
  };
  const { entity }: Props = $props();
  const kind =
    entities.get(entity.kind) || panic("entity kind not found", entity.kind);
</script>

<img
  src={kind.image}
  height={kind.size.height * CELL_SIZE.value}
  width={kind.size.width * CELL_SIZE.value}
  style="absolute"
  style:height="{kind.size.height * CELL_SIZE.value}px"
  style:width="{kind.size.width * CELL_SIZE.value}px"
  style:transform="rotate:{entity.rotation}deg"
  alt=""
/>
