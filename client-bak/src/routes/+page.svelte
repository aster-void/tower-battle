<script lang="ts">
import { client } from "$lib";

const width = 10;
const height = 10;
</script>

<div id="table">
  {#each { length: height } as _}
    <div>
      {#each { length: width } as _}
        <span> </span>
      {/each}
    </div>
  {/each}
</div>
