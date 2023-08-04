<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount, onDestroy } from 'svelte';
	import Logo from '$lib/components/Logo.svelte';
  
  let products = [];
  let viewProducts = false;
  const orderCounts = [0, 1, 2, 3, 4, 5];
  export let modalMsg;
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

<nav class="w-screen h-screen bg-white px-4 pt-4 pb-2">
  <div class="grid grid-cols-5 gap-5">
    <div class="flex justify-center items-center col-span-1">
      <Logo width="w-2/3" />
    </div>
    <button class="back-button" on:click={goBack}>X</button>
  </div>
  {#if modalMsg}
    <p>{modalMsg}</p>
  {/if}
  <div class="info-container">
    <div class="form">
      {#if variable===""}
      <h2>Add Coupon</h2>
      {:else}
      <h2>Edit Coupon</h2>
      {/if}
      <div class="column-container">
        <div class="column">
          <div class="input-grid">
            <label for="coupon-name">Coupon Name</label>
            <input type="text" id="coupon-name" bind:value={couponName} required/>
          </div>

          <div class="input-grid">
            <label for="code">Code</label>
            <input type="text" id="code" bind:value={code} required/>
          </div>

          <div class="input-grid">
            <label for="discounted-amount">Discounted Amount</label>
            <input type="number" id="discounted-amount" bind:value={discountedAmount} required min="1" max="99"/>
          </div>

        </div>
        
        <div class="column">
          <div class="requirements-section">
            <h3>Products</h3>
            <div class="dropdown-container">
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div class="dropdown-button" on:click={() => (viewProducts = !viewProducts)}>
                Set Product Requirements
              </div>
            </div>
            {#if viewProducts}
            <div class="product-container">
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
          
            <div class="input-grid">
              <label for="order-count-requirement">Order Count Requirement</label>
              <select id="order-count-requirement" bind:value={orderCountRequirement} required>
                {#each orderCounts as count}
                  <option value={count}>{count}</option>
                {/each}
              </select>
            </div>
            
          </div>
        
          <div class="activation-switch">
            <label>Activate</label>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" bind:checked={isActivated}>
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-sky-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-400"></div>
            </label>
          </div>
          
          <div class="button-container">
            {#if variable===""}
            <button class="save-button" on:click={saveCoupon}>Save</button>
            {:else}
            <button class="save-button" on:click={editCoupon}>Save</button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>




<style lang="postcss">
  .info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #383d55;
  font-family: Istok Web;
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

.form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  padding: 20px;
  margin-top: 30px;
}

.column {
  margin-top: 20px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  width: 50%;
  flex-basis: 50%;
}

.column-container {
  display: flex;
  flex-direction: row;
  gap: 200px;
  width: 100%;
}

.input-grid {
  margin-top: 20px;
}

label,
h3 {
  text-align: start;
  align-items: bottom;
  font-size: 16px;
  color: #352f75;
}

h2 {
  text-align: start;
  align-items: bottom;
  font-size: 24px;
  font-weight: 800;
  color: #352f75;
}

input[type='text'],
input[type='number'],
select {
  width: 100%;
  padding: 8px 16px;
  margin-top: 16px;
  font-size: 16px;
  color: #666666;
  background-color: #ecebfa;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  resize: vertical;
}

.dropdown-button {
  width: 100%;
  padding: 8px 16px;
  margin-top: 16px;
  cursor: pointer;
  font-size: 16px;
  color: #666666;
  background-color: #ecebfa;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.dropdown-button {
  cursor: pointer;
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
  gap: 20px;
}

.save-button {
  width: 100px;
  margin-top: 25px;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #383d55;
  color: #fff;
  cursor: pointer;
}

.product-container {
  background: #ecebfa;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
}

.product-item {
  display: inline-flex;
  flex-basis: 33.33%;
  justify-content: space-between;
  padding: 8px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}
</style>
