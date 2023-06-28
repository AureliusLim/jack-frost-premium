<script lang="ts">
  export let message: string;
  import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	const closeAlert = () => {
		dispatch('closeAlert');
	}
</script>


<div class="alert-base" in:fly={{ y: 100, duration: 500 }}>
  <div class="prompt-container">
    <span>{message}</span>
  </div>
	<div class="cls-btn">
    <button on:click={closeAlert}>X</button>

  </div>
</div>

<style>
  .alert-base {
    display: flex;
    padding-left: 15px;
    padding-right: 15px;
    height: 30px;
    width: fit-value;
    gap:30px;
    border-radius: 15px;
    background: rgba(12, 156, 0, 0.45);
  }

  .prompt-container {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(0, 128, 0, 1);
    font-weight: 700;
  }

  .cls-btn {
    display: flex;
    margin-right: 0px;
    margin-left: auto;
    color: rgba(0, 128, 0, 1);
    font-weight: 700;
  }


</style>
