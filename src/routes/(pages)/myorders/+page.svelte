<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	let selectedOrder;
	let orders = [];
	let filteredOrders = [];
	let items;
	let selectedTab = 'all';
	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('en-US', options).format(date);
	};
	const handleLogout = async () => {
		const response = await fetch('api/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: 'Logged out'
		});
		goto('/')
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
    document.getElementById(selectedTab).style.color = "rgba(0, 0, 0, 0.25)"; // change prev tab color
    document.getElementById(selectedTab).style.textDecoration = "none";
    document.getElementById("all").style.color = "rgba(247, 11, 33, 1)"; // change curr tab color
    document.getElementById("all").style.textDecoration = "underline";

    selectedTab = "all";
    filteredOrders = orders;
  }
  const onProcess = ()=>{
    document.getElementById(selectedTab).style.color = "rgba(0, 0, 0, 0.25)"; // change prev tab color
    document.getElementById(selectedTab).style.textDecoration = "none";
    document.getElementById("onProcess").style.color = "rgba(247, 11, 33, 1)"; // change curr tab color
    document.getElementById("onProcess").style.textDecoration = "underline";

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
    document.getElementById(selectedTab).style.color = "rgba(0, 0, 0, 0.25)"; // change prev tab color
    document.getElementById(selectedTab).style.textDecoration = "none";
    document.getElementById("completed").style.color = "rgba(247, 11, 33, 1)"; // change curr tab color
    document.getElementById("completed").style.textDecoration = "underline";

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
<svelte:head>
	<title>My Orders | Jack Frost Premium Ice Cream</title>
</svelte:head>

<style>
	.main-container {
		height: 720px;
		display: flex;
		gap: 40px;
		justify-content: center;
		padding: 40px;
		background: #cdd5eb;
	}
	.side-menu {
		width: 20%;
		height: 423px;
		padding-top: 20px;
		display: flex;
		flex-direction: column;

		background: #fff;
		color: #383d55;
		font-family: Istok Web;
	}

	.info-container {
		width: 60%;
		height: max;

		background: #fff;
		color: #383d55;
		font-family: Istok Web;
	}

	h1 {
		font-size: 29px;
		font-weight: bold;
		margin-top: 40px;
		margin-left: 40px;
	}

	.tabs-container {
		margin-top: 30px;
		margin-left: 40px;
		display: flex;
		gap: 50px;
		font-weight: 700;
		color: rgba(0, 0, 0, 0.25);
	}

	.tabs:hover {
		text-decoration: underline;
	}

	.ordertable {
		width: 100%;

		margin-top: 5px;
		justify-content: center;
		align-items: center;
		text-align: left;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.ordertable th {
		background-color: #f2f2f2;
		padding: 1rem 2.5rem;
	}

	.ordertable tr {
		height: 50px;
		width: 50px;
		cursor: pointer;
	}

	.ordertable td {
		padding: 1rem 2.5rem;
	}

	.ordertable tr:nth-child(even) {
		background-color: #f2f2f2;
	}

	.breakdown-container {
		height: max;
		width: 20%;
		padding: 30px;
		background: #fff;
		color: #383d55;
		font-family: Istok Web;
	}

	h4 {
		color: #383d55;
		font-weight: bold;
		margin-bottom: 20px;
	}

	h3 {
		color: rgba(0, 0, 0, 0.25);
		font-weight: bold;
		margin-top: 10px;
	}

	h2 {
		font-size: 23px;
		font-weight: bold;
		margin-bottom: 8px;
	}

	.breakdown {
		width: 100%;
		text-align: left;
	}
	.breakdown th:nth-child(1) {
		width: 70%;
	}

	.breakdown th:nth-child(2) {
		width: 30%;
	}

	.breakdown td:nth-child(1) {
		width: 70%;
	}

	.breakdown td:nth-child(2) {
		width: 30%;
	}

	p {
		margin-top: 180px;
		color: rgba(0, 0, 0, 0.25);
		font-weight: 700;
		font-size: 20px;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
</style>

<div class="max-w-full flex flex-col min-h-min">
  <div class="main-container">
    <div class="side-menu">
      <button on:click={()=> goto('/profile')}>Profile Information</button>
      <button on:click={() => goto('/changepassword')}>Change Password</button>
      <button on:click={() => goto('/myorders')}>My Orders</button>
      <button on:click={(handleLogout)} >Sign Out</button>
    </div>
    
    <div class="info-container">
      <h1>My Orders</h1>
      <div class="tabs-container">
        <button id="all" class="tabs" on:click={(allOrder)} style="color:rgba(247, 11, 33, 1); text-decoration:underline">All Orders</button>
        <button id="onProcess" class="tabs" on:click={(onProcess)}>On Process</button>
        <button id="completed" class="tabs" on:click={(completedOrder)}>Completed</button>
      </div>
		</div>

		<div class="info-container">
			<h1>My Orders</h1>
			<div class="tabs-container">
				<button class="tabs" on:click={allOrder}>All Orders</button>
				<button class="tabs" on:click={onProcess}>On Process</button>
				<button class="tabs" on:click={completedOrder}>Completed</button>
			</div>

			{#if orders.length > 0}
				<table class="ordertable">
					<thead>
						<tr>
							<th>Order No.</th>
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
				<p>No Orders Found.</p>
			{/if}
		</div>
		
    <div class="breakdown-container">
      {#if selectedOrder}
        
        <h3>Order No.</h3>
        <h2>#{Number(selectedOrder.orderNumber).toString().padStart(5, '0') ?? '*****'}</h2>
        <h3>Date Ordered</h3>
        <h4>{formatDate(selectedOrder.created_at)}</h4>

        <table class="breakdown">
          <thead>
            <th><h3>Item</h3></th>
            <th><h3>Price</h3></th>
          </thead>
          {#each items as item}
            <tr>
              <td>{item.product.name}</td>
              <td>Php {item.offering.price * item.quantity}</td>
            </tr>
          {/each}
        </table>

        <div class="total">
          <div><h3>Overall Total</h3></div>
          <div><h4>Php {selectedOrder.total_price}</h4></div>
        </div>
        
      {:else}
        <div class="empty-breakdown">
          <p>Select an order.</p>
        </div>
      {/if}
    </div>
  </div>
</div>
