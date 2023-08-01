<script lang='ts'>
  import type { PageData } from './$types';
  import TopProducts from '$lib/components/Analytics/TopProducts.svelte';
  import OrdersTable from '$lib/components/Analytics/OrdersTable.svelte';
 import LineGraph from '$lib/components/Analytics/LineGraph.svelte';
 import GeneralStats from '$lib/components/Analytics/GeneralStats.svelte';
 import ProductFilter from '$lib/components/Modal/ProductFilter.svelte';
 import OrderFilter from '$lib/components/Modal/OrderFilter.svelte';
 import PaymentFilter from '$lib/components/Modal/PaymentFilter.svelte';
 import TimeFilter from '$lib/components/Modal/TimeFilter.svelte';
  import {onMount, createEventDispatcher} from 'svelte';
  export let data: PageData;
  console.log(data.order)
  console.log(data.salesdata)
  let topProductsarr = [];
  let product_object = [];
  let fromDate = '';
  let toDate = '';
  let selectedProductNames = [];
  let filteredProducts = [];
  let filteredPayment = [];
  let selectedPayment = [];
  let selectedStatus = [];
  let filteredStatus = [];
  let productModal = false;
  let timeModal = false;
  let paymentModal = false;
  let orderModal = false;
  let viewingAll = true;
  const checkViewingAll = ()=>{
    if (filteredProducts.length == product_object.length && filteredPayment.length == 2 && filteredStatus.length == 2 && fromDate == '' && toDate == ''){
      viewingAll = true;
    }
    else{
      viewingAll = false;
    }
  }
  onMount(async()=>{
    const productresponse = await fetch('/api/products')
    const productdata = await productresponse.json()
    
    product_object = productdata.products
    let c = 0;
    fromDate = '';
    toDate = '';
    
    for(let counter = 0; counter < product_object.length; counter++){
      selectedProductNames[counter] = product_object[counter].name;
    }

    filteredProducts = selectedProductNames;
    selectedPayment = ['Unpaid', 'Fully Paid'];
    filteredPayment = selectedPayment;
    selectedStatus = ['On Process', 'Completed'];
    filteredStatus = selectedStatus;

    findTopSellingProducts();
  })
  const calculateSalesPerProduct = () =>{
      const productSalesMap = new Map();
      for (const order of data.order) {
        for (const orderDetail of order.order_details) {
          const productName = orderDetail.product.name;
          const quantity = orderDetail.quantity;
          const price = Number(orderDetail.offering.price) || 0;
          if (productName && quantity && price) {
            if (productSalesMap.has(productName)) {
              const existingData = productSalesMap.get(productName);
              existingData.salesRevenue += quantity * price;
              existingData.totalQuantitySold += quantity;
              productSalesMap.set(productName, existingData);
            } else {
              productSalesMap.set(productName, {
                product: productName,
                salesRevenue: quantity * price,
                totalQuantitySold: quantity,
              });
            }
          }
        }
      }
      return productSalesMap
  }


  // Function to find the top 5 selling products with sales revenue and total quantity sold
const findTopSellingProducts = () => {
  
  let productSalesMap = calculateSalesPerProduct()
  // Find the top 5 products with the maximum sales revenue
  const topProducts = Array.from(productSalesMap)
    .sort((a, b) => b[1].totalQuantitySold - a[1].totalQuantitySold ) // Sort in descending order based on sales revenue
    .slice(0, 5) // Take the top 5 products
    .map((item) => item[1]); // Extract only the data objects
  topProductsarr = topProducts
 
  return topProducts;

  
};
const openProduct = ()=>{
  productModal = true
  selectedProductNames = [];
}
const openTime = ()=>{
  productModal = false;
  paymentModal = false;
  timeModal = true;
  orderModal = false;
  console.log('OPENTIME')
}
const openPayment = ()=>{
  productModal = false;
  paymentModal = true;
  timeModal = false;
  orderModal = false;
}
const openOrder = ()=>{
  productModal = false;
  paymentModal = false;
  timeModal = false;
  orderModal = true;
}

const closeSettings = ()=>{
  productModal = false;
  paymentModal = false;
  timeModal = false;
  orderModal = false;
  selectedProductNames = [];
}

const filterProducts = (event)=>{ // executed when products are filtered
  productModal = false;
  paymentModal = false;
  timeModal = false;
  orderModal = false;
  selectedProductNames = []
  filteredProducts = []
  let eventobj = event.detail
  let productsarr = eventobj.chosenProducts
  console.log(productsarr)
  for (const product in productsarr) {
      
      if (productsarr.hasOwnProperty(product)) {
        const {status} = productsarr[product];
        if (status) {
          selectedProductNames.push(product);
        } 
      }
    }
   filteredProducts = selectedProductNames
   checkViewingAll();
}

const filterTime = (event)=>{
  productModal = false;
  paymentModal = false;
  timeModal = false;
  orderModal = false;
  let dateobj = event.detail
  fromDate = dateobj.fromDate
  toDate = dateobj.toDate
  checkViewingAll()
  console.log(event.detail)
}
const filterPayment = (event)=>{
  productModal = false;
  paymentModal = false;
  timeModal = false;
  orderModal = false;
 
  console.log(event.detail)

  selectedPayment = []
  filteredPayment = []
  let eventobj = event.detail
  let productsarr = eventobj.selected
  console.log(productsarr)
  for (const product in productsarr) {
      
      if (productsarr.hasOwnProperty(product)) {
        const {status} = productsarr[product];
        if (status) {
          selectedPayment.push(product);
        } 
      }
  }
   
   filteredPayment = selectedPayment
   checkViewingAll()
}
const filterOrder = (event)=>{
  productModal = false;
  paymentModal = false;
  timeModal = false;
  orderModal = false;
 
  console.log(event.detail)
  selectedStatus = []
  filteredStatus = []
  let eventobj = event.detail
  let productsarr = eventobj.selected
  console.log(productsarr)
  for (const product in productsarr) {
      
      if (productsarr.hasOwnProperty(product)) {
        const {status} = productsarr[product];
        if (status) {
          selectedStatus.push(product);
        } 
      }
    }
  
   filteredStatus = selectedStatus
   checkViewingAll()
}
  

 
 

</script>
<style>
  .title{
    text-align:center;
    font-weight: 700;
    padding:40px;
  }
  .top-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin: 0 auto;
  }

 
  .middle-container {
    display: grid;
    grid-template-columns: 1fr 1fr; 
    gap: 20px;
    max-width: 1000px; 
    margin: 0 auto;
    padding: 20px;
  }
  #gear_icon{
    position:absolute;
    top:5;
    right:0;
    cursor:pointer;
  }
</style>
<svelte:head>
  <title>Analytics | Jack Frost Premium Ice Cream</title>
</svelte:head>
<div>
  {#if viewingAll}
    <h2 class="title">View Analytics From: All</h2>
  {:else}
    <h2 class="title">View Analytics From: Custom</h2>
  {/if}
  
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <svg on:click={openProduct} height="60px" width="60px" id="gear_icon" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M424.5,216.5h-15.2c-12.4,0-22.8-10.7-22.8-23.4c0-6.4,2.7-12.2,7.5-16.5l9.8-9.6c9.7-9.6,9.7-25.3,0-34.9l-22.3-22.1  c-4.4-4.4-10.9-7-17.5-7c-6.6,0-13,2.6-17.5,7l-9.4,9.4c-4.5,5-10.5,7.7-17,7.7c-12.8,0-23.5-10.4-23.5-22.7V89.1  c0-13.5-10.9-25.1-24.5-25.1h-30.4c-13.6,0-24.4,11.5-24.4,25.1v15.2c0,12.3-10.7,22.7-23.5,22.7c-6.4,0-12.3-2.7-16.6-7.4l-9.7-9.6  c-4.4-4.5-10.9-7-17.5-7s-13,2.6-17.5,7L110,132c-9.6,9.6-9.6,25.3,0,34.8l9.4,9.4c5,4.5,7.8,10.5,7.8,16.9  c0,12.8-10.4,23.4-22.8,23.4H89.2c-13.7,0-25.2,10.7-25.2,24.3V256v15.2c0,13.5,11.5,24.3,25.2,24.3h15.2  c12.4,0,22.8,10.7,22.8,23.4c0,6.4-2.8,12.4-7.8,16.9l-9.4,9.3c-9.6,9.6-9.6,25.3,0,34.8l22.3,22.2c4.4,4.5,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l9.7-9.6c4.2-4.7,10.2-7.4,16.6-7.4c12.8,0,23.5,10.4,23.5,22.7v15.2c0,13.5,10.8,25.1,24.5,25.1h30.4  c13.6,0,24.4-11.5,24.4-25.1v-15.2c0-12.3,10.7-22.7,23.5-22.7c6.4,0,12.4,2.8,17,7.7l9.4,9.4c4.5,4.4,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l22.3-22.2c9.6-9.6,9.6-25.3,0-34.9l-9.8-9.6c-4.8-4.3-7.5-10.2-7.5-16.5c0-12.8,10.4-23.4,22.8-23.4h15.2  c13.6,0,23.3-10.7,23.3-24.3V256v-15.2C447.8,227.2,438.1,216.5,424.5,216.5z M336.8,256L336.8,256c0,44.1-35.7,80-80,80  c-44.3,0-80-35.9-80-80l0,0l0,0c0-44.1,35.7-80,80-80C301.1,176,336.8,211.9,336.8,256L336.8,256z"/></svg>
</div>
{#if productModal}
  <ProductFilter on:filterproducts={filterProducts}  on:openTime={openTime} on:openPayment={openPayment} on:openOrder={openOrder} on:close={closeSettings} />
{:else if timeModal}
  <TimeFilter on:timeFilter={filterTime} on:openProduct={openProduct} on:openPayment={openPayment} on:openOrder={openOrder} on:close={closeSettings} />
{:else if paymentModal}
  <PaymentFilter on:paymentFilter={filterPayment} on:openTime={openTime} on:openProduct={openProduct} on:openOrder={openOrder} on:close={closeSettings} />
{:else if orderModal}
  <OrderFilter on:orderFilter={filterOrder} on:openTime={openTime} on:openPayment={openPayment} on:openProduct={openProduct} on:close={closeSettings} />
{/if}


<div class="top-container">
    {#key filteredProducts}
      {#key fromDate}
        {#key toDate}
          {#key filteredPayment}
            {#key filteredStatus}
            <GeneralStats selectedProductNames={filteredProducts} salesdata={data.salesdata} fromDate={fromDate} toDate={toDate} selectedPayment={filteredPayment} selectedStatus={filteredStatus}/>
            {/key}
          {/key}
        {/key}
      {/key}
    {/key}
</div>
<div class="middle-container">
  <div>
    {#key filteredProducts}
      {#key fromDate}
        {#key toDate}
          {#key filteredPayment}
            {#key filteredStatus}
              <LineGraph salesdata={data.salesdata}  selectedProductNames={filteredProducts} fromDate = {fromDate} toDate = {toDate} selectedPayment={filteredPayment} selectedStatus={filteredStatus}/>
            {/key}
          {/key}
        {/key}
      {/key}
    {/key}

  </div>

  <div>
    {#key filteredProducts}
      {#key fromDate}
        {#key toDate}
          {#key filteredPayment}
            {#key filteredStatus}
              <TopProducts salesdata = {data.salesdata} selectedProductNames={filteredProducts} fromDate = {fromDate} toDate = {toDate} selectedPayment={filteredPayment} selectedStatus={filteredStatus}/>
            {/key}
          {/key}
        {/key}
      {/key}
    {/key}

  </div>
  
</div>

<OrdersTable />