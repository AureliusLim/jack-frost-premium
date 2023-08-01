<script>
  import { onMount, onDestroy, afterUpdate } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import TemplateModal from '$lib/components/Modal/Template.svelte';
  const dispatch = createEventDispatcher();
  let fromDate = '';
  let toDate = '';
  let errormsg = false;
  onMount(async()=>{
  
  })
  
  const close = () => {
    dispatch('close');
  };
  const openProduct = () =>{
    dispatch('openProduct')
  }
  const openPayment = () =>{
    dispatch('openPayment')
  }
  const openOrder = () =>{
    dispatch('openOrder')
  }
  const handleSubmit = (event) => {
    if(fromDate.length == 0  && toDate.length == 0){
      dispatch('timeFilter', { fromDate: fromDate, toDate: toDate });
    }
    else if (fromDate >= toDate) {
      errormsg = true;
      event.preventDefault();
      return;
    }
    dispatch('timeFilter', { fromDate: fromDate, toDate: toDate });
  };
</script>

<div class='modal-wrapper'>
  <TemplateModal width="max-w-7xl" on:closeModal={close} bgColor="bg-white">
      <div slot="header">
        <h1>Analytics Configuration Settings</h1>
        <div class="button-container">
          <button on:click={openProduct}>Product</button>
          <button id="currentTab">Time Range</button>
          <button on:click={openPayment}>Payment Status</button>
          <button on:click={openOrder}>Order Status</button>
        </div>
        <h3>Time Range Filter</h3>
        {#if errormsg}
          <p>The start date must be before the end date.</p>
        {/if}
      </div>
      <div slot="body">
        <form on:submit={handleSubmit}>
          <div class="form-group">
    
            <label for="fromDate">From:</label>
            <input type="date" id="fromDate" bind:value={fromDate} />

            <label for="toDate">To:</label>
            <input type="date" id="toDate" bind:value={toDate} />
          </div>
          <div class="button-container">
            <button class="save-button" type="submit">Submit</button>
          </div>
        </form>
      </div>
  </TemplateModal>
</div>

<style>
  .button-container button {
    padding:10px;
  }
  input{
    border:1px solid black;
  }
  #currentTab{
    background-color:aqua;
  }
</style>