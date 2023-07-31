<script>
  import { onMount, onDestroy, afterUpdate } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import TemplateModal from '$lib/components/Modal/Template.svelte';
  const dispatch = createEventDispatcher();
  let list = [];
  let selectedProducts;
  let selectAll = true;
  onMount(async()=>{
    //get all the products
    list=[];
    const productresponse = await fetch('/api/products')
    const productdata = await productresponse.json()

    let product_object = productdata.products
    let c = 0;
   
    
    for(let counter = 0; counter < product_object.length; counter++){
      list[counter] = product_object[counter].name;
    }
   
    for (let counter = 0; counter < product_object.length; counter++){
      selectedProducts = {
          ...selectedProducts,
          [product_object[counter].name]: {status: true}
        }
    }
  
  })
  const toggleProductSelection = (product) => {
    selectedProducts = {
      ...selectedProducts,
      [product]: {status: selectedProducts[product] ? !selectedProducts[product].status : true}
    };
    //check if all are checked
    let failedTest = false;
    for(const product in selectedProducts){
        if(selectedProducts[product].status == false){
        
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
   
  };
  const toggleSelectAll = () =>{
    selectAll = !selectAll
    if(!selectAll){
      for(const product in selectedProducts){
        selectedProducts[product].status = false;
      }
    }
    else{
      for(const product in selectedProducts){
        selectedProducts[product].status = true;
      }
    }
  }
  const close = () => {
    dispatch('close');
  };
  const handleSubmit = ()=>{
    
    dispatch('filterproducts', {chosenProducts : selectedProducts})
  }
</script>

<div class='modal-wrapper'>
  <TemplateModal width="max-w-7xl" on:closeModal={close} bgColor="bg-white">
      <div slot="header">
        <h1>Analytics Configuration Settings</h1>
      </div>
      <div slot="body">
        <form on:submit={handleSubmit}>
          <div class="form-group">
            <h3>Select Products:</h3>
            <div class="product-grid">
              <input type="checkbox" checked={selectAll} on:change={toggleSelectAll}>
              All Products
              {#each list as product}
                <div class="product-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedProducts[product] && selectedProducts[product].status}
                      on:change={() => toggleProductSelection(product)}
                    />
                    {product}
                  </label>
                </div>
              
              {/each}
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
  
</style>