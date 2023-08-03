<script>
  import { onMount, onDestroy, afterUpdate } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import TemplateModal from '$lib/components/Modal/Template.svelte';

  const dispatch = createEventDispatcher();
  
  let selectedItems = ['On Process', 'Completed']
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
  const openPayment = () =>{
    dispatch('openPayment')
  }
  const handleSubmit = ()=>{
    
    dispatch('orderFilter', {selected: selected})
  }
</script>

<div class='modal-wrapper'>
  <TemplateModal width="max-w-7xl" on:closeModal={close} bgColor="bg-white">
      <div slot="header">
        <h1>Analytics Configuration Settings</h1>
        <div class="tab-container">
          <button on:click={openProduct}>Product</button>
          <button on:click={openTime}>Time Range</button>
          <button on:click={openPayment}>Payment Status</button>
          <button id="currentTab">Order Status</button>
        </div>
        <h3>ORDER FILTER</h3>
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
  h1 {
    color: #352F75;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
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

  .form-group {
    width: 400px;
  }

  .button-container{
    display:flex;
    justify-content: right;
    margin-top: 15px;
    color: #352F75;
    font-weight: 600;
    font-size: 16px;
  } 

  input {
    color: #585858;
  }
</style>