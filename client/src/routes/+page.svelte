<script lang="ts">
  import { onMount } from "svelte";
  import { GameState, profile } from "core";
  import Running from "~/scenes/running.svelte";
  import Finished from "~/scenes/finished.svelte";
  import { panic } from "core/utils";

  const player = "you";
  const opponent = "cp";
  let scores = $state({
    you: profile.defaultHealth,
    cp: profile.defaultHealth,
  });
  let game = $state(new GameState(profile, player, [player, opponent]));
  $effect(() => {
    game.onScoreChange = onScoreChange;
  });

  let paused = $state(false);

  function reset() {
    game = new GameState(profile, player, [player, opponent]);
    scores.you = profile.defaultHealth;
    scores.cp = profile.defaultHealth;
    game.onScoreChange = onScoreChange;
  }

  function onScoreChange(s: Map<string, number>) {
    scores.you = s.get("you") ?? panic("");
    scores.cp = s.get("cp") ?? panic("");
  }

  onMount(() => {
    const id = setInterval(() => {
      if (game.scene.kind === "running" && !paused) {
        game.tick();
      }
    }, 50);
    return () => {
      clearInterval(id);
    };
  });
</script>

{#if game.scene.kind === "running"}
  <Running {game} {scores} {player} bind:paused {reset} />
{:else if game.scene.kind === "finished"}
  <Finished {game} {player} {reset} />
{/if}
