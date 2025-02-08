<script lang="ts">
  import { profile, Table } from "core/table";
  import TableRenderer from "~/renderer/Table.svelte";

  const table = new Table(profile.size.w, profile.size.h, profile.path);
</script>

<TableRenderer {table} />
