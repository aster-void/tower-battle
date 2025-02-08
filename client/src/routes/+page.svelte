<script lang="ts">
  import { profile, Table, type Entity } from "core";
  import { onMount } from "svelte";
  import Entities from "~/renderer/Entities.svelte";
  import TableRenderer from "~/renderer/Table.svelte";

  const table = new Table(profile.size.w, profile.size.h, profile.path);
  const entities: Entity[] = $state([]);

  onMount(() => {
    const id = setTimeout(() => {});
  });
</script>

<TableRenderer {table} />
<Entities {entities} />
