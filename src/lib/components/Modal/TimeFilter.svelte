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
        <div class="tab-container">
          <button on:click={openProduct}>Product</button>
          <button id="currentTab">Time Range</button>
          <button on:click={openPayment}>Payment Status</button>
          <button on:click={openOrder}>Order Status</button>
        </div>
        <h3>TIME RANGE FILTER</h3>
        {#if errormsg}
          <p>The start date must be before the end date.</p>
        {/if}
      </div>
      <div slot="body">
        <form on:submit={handleSubmit}>
          <div class="form-group">
            
            <div class="input-group">
              <label for="fromDate">FROM</label>
              <input type="date" id="fromDate" bind:value={fromDate} />
            </div>
            
            <br><br>
            <div class="input-group">
            <label for="toDate">TO</label>
            <input type="date" id="toDate" bind:value={toDate} />
            </div>
          </div>
          <div class="button-container">
            <button class="save-button" type="submit">Submit</button>
          </div>
        </form>
      </div>
  </TemplateModal>
</div>

<style>
  h1 {
    color: #352F75;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 15px;
  }

  h3 {
    color: #352F75;
    font-weight: 500;
  }

  .tab-container {
    display: flex;
    border-bottom: 1px solid #B4B4B4;
    margin-bottom: 15px;
    gap: 5px;
  }

  .tab-container button {
    padding:5px 10px;
    color: #352F75;
  }

  #currentTab{
    background-color: #CDD5EB;
    border-bottom: 2px solid #352F75;
  }

  input{
    border: 1.5px solid #B2B2B2;
    background-color: white;
    border-radius: 0px;
    width: 50%;
  }

  .form-group {
    width: 400px;
  }

  .input-group{
    justify-content: space-between;
  }

  label{
    color: #352F75;
  }

  .button-container{
    display:flex;
    justify-content: right;
    margin-top: 15px;
    color: #352F75;
    font-weight: 600;
    font-size: 16px;
  }
</style>