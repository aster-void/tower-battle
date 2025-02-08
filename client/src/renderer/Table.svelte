<script lang="ts">
  import Dirt from "~/assets/dirt.webp";
  import Grass from "~/assets/grass.jpg";
  import type { Table } from "core/table";
  import { CELL_SIZE } from "~/lib/states.svelte";
  type Props = {
    table: Table;
  };
  const { table }: Props = $props();
</script>

{#each table.cells as row, ri (ri)}
  <div>
    {#each row as cell, ci (ci)}
      {#if cell.kind === "path"}
        <img
          src={Dirt}
          alt="path"
          width={CELL_SIZE.value}
          height={CELL_SIZE.value}
          class:width={CELL_SIZE.value}
          class:height={CELL_SIZE.value}
        />
      {:else}
        <img
          src={Grass}
          alt="grass"
          width={CELL_SIZE.value}
          height={CELL_SIZE.value}
          class:width={CELL_SIZE.value}
          class:height={CELL_SIZE.value}
        />
      {/if}
    {/each}
  </div>
{/each}

<style>
  div,
  img {
    margin: 0px;
    min-height: 0px;
    height: auto;
    line-height: 0px;
  }
  img {
    display: inline;
  }
</style>
