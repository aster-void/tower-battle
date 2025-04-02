<script lang="ts">
  import { attackers, Entity, GameState } from "core";
  import { onMount } from "svelte";
  import Pause from "~/overlays/pause.svelte";
  import Entities from "~/renderer/Entities.svelte";
  import TableRenderer from "~/renderer/Table.svelte";
  import Scores from "~/renderer/ui/scores.svelte";

  let {
    game,
    player,
    paused = $bindable(),
    reset,
    scores,
  }: {
    game: GameState;
    player: string;
    reset: () => void;
    paused: boolean;
    scores: { you: number; cp: number };
  } = $props();

  const opponent = game.players.filter((p) => p !== player)[0];

  let difficulty = $state(30);
  const interval = $derived(1000 / difficulty);
  onMount(() => {
    let cooldown = 0;
    const id = setInterval(() => {
      if (!paused) {
        cooldown++;
        if (cooldown >= interval) {
          cooldown = 0;
          const e = Entity.Attacker("atk1", opponent, player, 1);
          game.spawn(e);
        }
      }
    }, 50);
    return () => clearInterval(id);
  });
</script>

<Pause bind:paused {reset} />
<div class="flex top flex-row justify-center">
  <div class="w-fit">
    <Scores {scores} />
    <Entities entities={game.entities} ctx={game} />
    <TableRenderer table={game.table} />
  </div>
</div>

<div class="flex flex-row justify-center">
  <span class="text-yellow-500">
    ${game.money}
  </span>
</div>
<div class="flex flex-row justify-center flex-wrap">
  {#each attackers as entity}
    <button
      class="btn btn-primary"
      disabled={game.money < entity.cost}
      onclick={() => {
        game.money -= entity.cost;
        for (const o of game.players) {
          if (o === player) continue;
          const e = Entity.Attacker(entity.name, player, o, -1);
          game.spawn(e);
        }
      }}
    >
      Spawn {entity.name}
      <span class="text-yellow-300">
        ${entity.cost}
      </span>
    </button>
  {/each}
</div>
<div class="flex flex-row justify-center flex-wrap">
  <label class="flex m-6">
    <span class="text-xl">Difficulty</span>
    <span
      class:range-accent={difficulty < 15}
      class:range-success={15 <= difficulty && difficulty < 25}
      class:range-warning={25 <= difficulty && difficulty < 40}
      class:range-error={40 <= difficulty}
    >
      {difficulty}
    </span>
    <input
      type="range"
      min="1"
      max="50"
      bind:value={difficulty}
      class="range"
      class:range-accent={difficulty < 15}
      class:range-success={15 <= difficulty && difficulty < 25}
      class:range-warning={25 <= difficulty && difficulty < 40}
      class:range-error={40 <= difficulty}
    />
  </label>
</div>

<style>
  *:not(.top) {
    margin: 16px 4px;
    user-select: none;
  }
</style>
