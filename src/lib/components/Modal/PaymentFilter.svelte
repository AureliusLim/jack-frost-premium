<script>
  import { onMount, onDestroy, afterUpdate } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import TemplateModal from '$lib/components/Modal/Template.svelte';

  const dispatch = createEventDispatcher();
  
  let selectedItems = ['Unpaid', 'Fully Paid']
  let selected = []
  let selectAll = true;
  onMount(async()=>{
    for (let counter = 0; counter < selectedItems.length; counter++){
      selected = {
          ...selected,
          [selectedItems[counter]]: {status: true}
        }
    }
    console.log(selected)
  })
  const toggleProductSelection = (product) => {
    selected = {
      ...selected,
      [product]: {status: selected[product] ? !selected[product].status : true}
    };
    //check if all are checked
    let failedTest = false;
    for(const product in selected){
        if(selected[product].status == false){
        
          failedTest = true;
          break
        }
    }
    if(failedTest){
      selectAll = false;
    }
    else{
      selectAll = true;
    }
   console.log(selected)
  };
  const toggleSelectAll = () =>{
    selectAll = !selectAll
    if(!selectAll){
      for(const product in selected){
        selected[product].status = false;
      }
    }
    else{
      for(const product in selected){
        selected[product].status = true;
      }
    }
  }
  const close = () => {
    dispatch('close');
  };
  const openTime = () =>{
    dispatch('openTime')
  }
  const openProduct = () =>{
    dispatch('openProduct')
  }
  const openOrder = () =>{
    dispatch('openOrder')
  }
  const handleSubmit = ()=>{
    
    dispatch('paymentFilter', {selected: selected})
  }
</script>

<div class='modal-wrapper'>
  <TemplateModal width="max-w-7xl" on:closeModal={close} bgColor="bg-white">
      <div slot="header">
        <h1>Analytics Configuration Settings</h1>
        <div class="button-container">
          <button on:click={openProduct}>Product</button>
          <button on:click={openTime}>Time Range</button>
          <button id="currentTab">Payment Status</button>
          <button on:click={openOrder}>Order Status</button>
        </div>
        <h3>Payment Filter</h3>
      </div>
      <div slot="body">
        <form on:submit={handleSubmit}>
          <div class="form-group">
            <div class="product-grid">
              <input type="checkbox" checked={selectAll} on:change={toggleSelectAll}>All
              {#each selectedItems as product}
                <div class="product-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selected[product] && selected[product].status}
                      on:change={() => toggleProductSelection(product)}
                    />
                    {product}
                  </label>
                </div>
              
              {/each}
              
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
    padding:10px
  }
  #currentTab{
    background-color:aqua;
  }
</style>