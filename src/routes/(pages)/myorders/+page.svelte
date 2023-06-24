<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  let selectedOrder;
  let orders = [];
  let filteredOrders = [];
  let items;
  let selectedTab = "all";
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  const handleLogout = async() =>{
		const response = await fetch('api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: "Logged out",
      });
			
			console.log("LOGGED OUT")
			goto("/")
	}

  const getQuantity = (orderDetails)=>{
    let ctr = 0;
    for (let c = 0; c < orderDetails.length; c++){
      ctr += orderDetails[c].quantity;
    }
    return ctr;
  }
  const selectOrder = (order) => {
    selectedOrder = order;
    items = selectedOrder.order_details;
    console.log(selectedOrder)
  }
  const allOrder = ()=>{
    selectedTab = "all";
    filteredOrders = orders;
  }
  const onProcess = ()=>{
    selectedTab = "onProcess";
    filteredOrders= [];
    let count = 0;
    for(let c = 0; c < orders.length; c++){
      if(orders[c].payment_status !== "SS"){
        filteredOrders[count] = orders[c];
        count++;
      }
    }
    console.log(filteredOrders);
  }
  const completedOrder = ()=>{
    selectedTab = "completed";
    filteredOrders= [];
    let count = 0;
    for(let c = 0; c < orders.length; c++){
      if(orders[c].payment_status === "SS"){
        filteredOrders[count] = orders[c];
        count++;
      }
    }
    console.log(filteredOrders);
  }
  onMount(async () => {
    console.log("MOUNTING")
    try {
      const response = await fetch('api/get-myorders');
      const data = await response.json();
      orders = data.orders;
      filteredOrders = orders;
      console.log(orders);
      // Fetch the orders from the API
    } catch (error) {
      console.error(error);
    }
  });
</script>
<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .content-wrapper {
    flex-grow: 1;
    min-height: 200px;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .left-box {
    width: 25%;
    border: 1px solid black;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .ordertable {
    width: 50%;
    border: 1px solid black;
    margin:5px;
  }
  .ordertable th {
    text-align: left; 
  }

  .right-box {
    width: 25%;
    border: 1px solid black;
    margin:10px;
  }

  tr{
    height:50px;
    width:50px;
    cursor: pointer;
  }
  .breakdown th:nth-child(1) {
    width: 70%;
  }

  .breakdown th:nth-child(2) {
    width: 30%;
  }
  .tabs {
    font-weight: lighter;
    
  }

  .tabs:hover {
    text-decoration: underline;
  }
</style>
<svelte:head>
  <title>My Orders | Jack Frost Premium Ice Cream</title>
</svelte:head>


<div class="container">
  <div class="content-wrapper">
    <div class="left-box">
      <button on:click={()=> goto('/profile')}>Profile Information</button>
      <button >Change Password</button>
      <button on:click={() => goto('/myorders')}>My Orders</button>
      <button on:click={(handleLogout)} >Sign Out</button>
    </div>
    
    {#if orders.length > 0}
    
      <table class="ordertable">
       
        <thead>
          <tr>
            <th><button class="tabs" on:click={(allOrder)}>All Orders</button></th>
            <th><button class="tabs" on:click={(onProcess)}>On Process</button></th>
            <th><button class="tabs" on:click={(completedOrder)}>Completed</button></th>
          </tr>

          <tr>
            <th>Order No</th>
            <th>Date Ordered</th>
            <th>Status</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredOrders as order}

            <tr on:click={() => selectOrder(order)}>
              <td>#{Number(order.orderNumber).toString().padStart(5, '0') ?? '*****'}</td>
              <td>{formatDate(order.created_at)}</td>
              <td>
                {#if order.payment_status === 'SS'}
                  Completed
                {:else}
                  On Process
                {/if}
              </td>
              <td>{getQuantity(order.order_details)}</td>
              <td>{order.total_price}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <table class="ordertable"><thead><tr><th>No Orders Found.</th></tr></thead></table>
    {/if}
    <div class="right-box">
      {#if selectedOrder}
        
        <p>Order No: #{Number(selectedOrder.orderNumber).toString().padStart(5, '0') ?? '*****'}</p>
        <table class="breakdown">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
            </tr>
          </thead>
          {#each items as item}
            <tr>
              <td>{item.product.name}</td>
              <td>{item.offering.price * item.quantity}</td>
            </tr>

          {/each}
        </table>
        
      {:else}
        <p>Select an order to view its details</p>
      {/if}
    </div>
  </div>
</div>
