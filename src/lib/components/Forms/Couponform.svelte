<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount, onDestroy } from 'svelte';

  
  let products = [];
  let viewProducts = false;
  const orderCounts = [0, 1, 2, 3, 4, 5];
  export let variable;
  export let couponName;
  export let code;
  export let discountedAmount;
  export let productRequirement;
  export let orderCountRequirement;
  export let isActivated;
 
  let selectedProducts = {};
  const dispatch = createEventDispatcher();
  onMount(async()=>{
    
    const res = await fetch('/api/products')
    const data = await res.json();
    
    for(let counter = 0; counter < data.products.length; counter++){
      products[counter] = data.products[counter].name
    }
    if(variable){
      setTimeout(() => {
          for (let counter = 0; counter < productRequirement.length; counter++) {
            for (let x = 0; x < products.length; x++) {
              if (productRequirement[counter] === products[x]) {
                selectedProducts = {
                  ...selectedProducts,
                  [products[x]]: { status: true, original: true },
                };
              }
            }
          }
      }, 1000); // Add a delay of 1000 milliseconds (1 second)
    }
    
  })
 
  const saveCoupon = async() => {
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
    
    console.log('Selected Products:', selectedProductNames);
    console.log('Unselected Products:', unselectedProductNames);
    const coupon = {
      name: couponName,
      code,
      discountedAmount,
      selectedProductNames,
      unselectedProductNames,
      orderCountRequirement,
      isActivated
    };
    dispatch('save', coupon)
  };
  const editCoupon = async() => {
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
    
    console.log('Selected Products:', selectedProductNames);
    console.log('Unselected Products:', unselectedProductNames);
    const coupon = {
      originalname: variable,
      name: couponName,
      code,
      discountedAmount,
      selectedProductNames,
      unselectedProductNames,
      orderCountRequirement,
      isActivated
    };
    dispatch('edit', coupon)
  };

  const toggleProductSelection = (product) => {
    selectedProducts = {
      ...selectedProducts,
      [product]: {status: selectedProducts[product] ? !selectedProducts[product].status : true,  original: selectedProducts[product] && selectedProducts[product].original === true ? true : false}
    };
    console.log(selectedProducts)
  };

  const goBack = () => {
    dispatch('back');
  };
</script>

<div class="add-coupon-container">
  <button class="back-button" on:click={goBack}>X</button>
  <h2>Add Coupon</h2>
  <div class="form">
    <label for="coupon-name">Coupon Name</label>
    <input type="text" id="coupon-name" bind:value={couponName} required/>

    <label for="code">Code</label>
    <input type="text" id="code" bind:value={code} required/>

    <label for="discounted-amount">Discounted Amount</label>
    <input type="number" id="discounted-amount" bind:value={discountedAmount} required min="1" max="99"/>

    <div class="requirements-section">
      <h3>Requirements:</h3>
      <div class="dropdown-container">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="dropdown-button" on:click={() => (viewProducts = !viewProducts)}>
          Set Product Requirements
        </div>
      </div>
      {#if viewProducts}
      <div class="form-group">
        <div class="product-grid">
          {#each products as product, index}
            <div class="product-item">
              <p>{product}</p>
              <input
                    type="checkbox"
                    checked={selectedProducts[product] && selectedProducts[product].status}
                    on:change={() => toggleProductSelection(product)}
                  />
            </div>
            {#if (index + 1) % 3 === 0}
              <div class="product-grid"/>
            {/if}
          {/each}
        </div>
      </div>
      {/if}
    
      <label for="order-count-requirement">Order Count Requirement</label>
      <select id="order-count-requirement" bind:value={orderCountRequirement} required>
        {#each orderCounts as count}
          <option value={count}>{count}</option>
        {/each}
      </select>
    </div>

    <div class="activation-switch">
      <label>Activate</label>
      <input type="checkbox" bind:checked={isActivated} />
    </div>
    {#if variable===""}
    <button class="save-button" on:click={saveCoupon}>Save</button>
    {:else}
    <button class="save-button" on:click={editCoupon}>Save</button>
    {/if}
  </div>
</div>

<style>
  .logo{
    width: 100%;
  }
  .add-coupon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .back-button {
    position: absolute;
    top: 50px;
    right: 50px;
    border: none;
    background: none;
    font-size: 50px;
    cursor: pointer;
  }

  h2 {
    margin-bottom: 20px;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 1000px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
  }

  label {
    margin-bottom: 5px;
  }

  input,
  select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .requirements-section {
    margin-top: 15px;
  }

  .requirements-section h3 {
    margin-bottom: 5px;
  }

  .activation-switch {
    display: flex;
    align-items: center;
    margin-top: 15px;
  }

  .activation-switch label {
    margin-right: 5px;
  }

  .save-button {
    width: 100px;
    margin-top: 15px;
    padding: 8px;
    border: none;
    border-radius: 4px;
    background-color: #333;
    color: #fff;
    cursor: pointer;
  }
  .form-group {
    margin-bottom: 1rem;
  }
  .product-grid {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.5rem;
  }

  .product-item {
    flex-basis: 33.33%;
    padding: 5px;
  }
  .dropdown-button {
    position: relative;
    display: inline-block;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #333;
    color: #fff;
    cursor: pointer;
    margin:10px
  }
  
</style>
