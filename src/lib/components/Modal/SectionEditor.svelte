<script lang="ts">
  import { onMount, onDestroy, afterUpdate } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import TemplateModal from '$lib/components/Modal/Template.svelte';

  const dispatch = createEventDispatcher();
  
  onMount(async()=>{
    //get all the products
    list=[];
    const productresponse = await fetch('/api/products')
    const productdata = await productresponse.json()
    let product_object = productdata.products
    let c = 0;
    console.log(product_object)
    
    for(let counter = 0; counter < product_object.length; counter++){
      list[counter] = product_object[counter].name;
    }
    const response = await fetch('/api/sections/getspecific', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({name: sectionName})
		});
    const data = await response.json();
    console.log(data.sections[0]); // response data
    sectionObj = data.sections[0];
    //make sure to tick the products already in the category
    for (let counter = 0; counter < sectionObj.products.length; counter++){
      selectedProducts = {
          ...selectedProducts,
          [sectionObj.products[counter].name]: {status: true, original:true}
        }
    }   
  })

  const close = () => {
    dispatch('close');
  };

  export let sectionName;
  let sectionObj= {};
  let newSectionName = sectionName;
  let discountRate;
  let selectedProducts = {};
  let list=[];
  let discount;

  const toggleProductSelection = (product) => {
    selectedProducts = {
      ...selectedProducts,
      [product]: {status: selectedProducts[product] ? !selectedProducts[product].status : true,  original: selectedProducts[product] && selectedProducts[product].original === true ? true : false}
    };
    console.log(selectedProducts)
  };

  const handleSubmit = async() => {
    const selectedProductNames = [];
    const unselectedProductNames = [];
    console.log(selectedProducts)
    console.log(Object.entries(selectedProducts))
    for (const product in selectedProducts) {
      
      if (selectedProducts.hasOwnProperty(product)) {
        const {status, original} = selectedProducts[product];
        if (status) {
          selectedProductNames.push(product);
        } else if (original && !status) {
          unselectedProductNames.push(product);
        }
      }
    }
    console.log('New Section Name:', newSectionName);
    console.log('Selected Products:', selectedProductNames);
    console.log('Unselected Products:', unselectedProductNames);
    // api for updating
    let resp = await fetch('/api/sections/add/products', {
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ID:sectionObj.id, updatedName: newSectionName, selected: selectedProductNames, unselected: unselectedProductNames})
    })
    let d = await resp.json();
    console.log(d.success);
    location.reload()
    close()

  };

</script>
<div class='modal-wrapper'>
  <TemplateModal width="max-w-7xl" on:closeModal={close} bgColor="bg-white">
    <div slot="header">
      <h1>Section Editor</h1>
    </div>
    <div slot="body">
      <form on:submit={handleSubmit}>
        <div class="form-group">
          <label for="sectionName">Section Name:</label>
          <input type="text" id="sectionName" bind:value={newSectionName} class="form-input" />
        </div>
        <div class="form-group">
          <h3>Select Products:</h3>
          <div class="product-grid">
            {#each list as product, index}
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
              {#if (index + 1) % 3 === 0}
                <div class="product-grid"/>
              {/if}
            {/each}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </TemplateModal>
</div>

<style>
  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
  }

  h1 {
    color: #4a5568;
    font-size: larger;
    font-weight: bold;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }

  .product-grid {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.5rem;
  }

  .product-item {
    flex-basis: 33.33%;
    padding: 0.5rem;
  }
</style>