<script lang="ts">
  export let message: string;
  import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	const closeAlert = () => {
		dispatch('closeAlert');
	}
</script>


<div class="alert-base">
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
    background: rgba(230, 0, 0, 0.45);
  }

  .prompt-container {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(153, 66, 66, 1);
    font-weight: 700;
  }

  .cls-btn {
    display: flex;
    margin-right: 0px;
    margin-left: auto;
    color: rgba(153, 66, 66, 1);
    font-weight: 700;
  }


</style>
