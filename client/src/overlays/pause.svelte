<script lang="ts">
  import { onMount } from "svelte";

  let { paused = $bindable(), reset }: { paused: boolean; reset: () => void } =
    $props();

  let modal = $state<HTMLDialogElement>();
  let form = $state<HTMLFormElement>();

  onMount(() => {
    function ev(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (paused) {
          form?.submit();
          paused = false;
        } else {
          modal?.showModal();
          paused = true;
        }
      }
    }
    window.addEventListener("keyup", ev);
    return () => window.removeEventListener("keyup", ev);
  });
</script>

<dialog bind:this={modal} class="modal">
  <div class="modal-box">
    <form bind:this={form} method="dialog"></form>
    <h3 class="text-lg font-bold m-6">PAUSE</h3>
    <button
      class="btn btn-block"
      onclick={() => {
        form?.submit();
        paused = false;
        reset();
      }}
    >
      reset
    </button>
    <div class="modal-action">
      <button
        class="btn btn-block"
        onclick={() => {
          form?.submit();
          paused = false;
        }}
      >
        Continue
      </button>
    </div>
  </div>
</dialog>
