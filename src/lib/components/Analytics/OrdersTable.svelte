<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
  export let selectedProductNames;
  export let salesdata;
  export let fromDate;
  export let toDate;
  export let selectedPayment;
  export let selectedStatus;
  const fromDateObj = new Date(fromDate);
  const toDateObj = new Date(toDate);
  const containsUnpaid = selectedPayment.includes('Unpaid');
  const containsPaid = selectedPayment.includes('Fully Paid');
  const containsCompleted = selectedStatus.includes('Completed');
  const containsProcess = selectedStatus.includes('On Process');
  
	
	
	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('en-US', options).format(date);
	};

  
  onMount(()=>{
    console.log(salesdata)
    // Filter the data based on the date range
    let filteredData = [];
    if(fromDate.length > 0 && toDate.length > 0){
        filteredData = salesdata.filter((item) => {
        const itemDateObj = new Date(item.date);
        return itemDateObj >= fromDateObj && itemDateObj <= toDateObj;
      });
    }
    else{
      filteredData = salesdata;
    }
  
  // Filter the data based on the conditions for payment status
  filteredData = filteredData.filter((obj) => {
    if (containsUnpaid && containsPaid) {
      return true; // No need to filter, keep all data
    } else if (containsUnpaid) {
      return obj.paymentstatus === 'NP' || obj.paymentstatus === 'PP';
    } else if (containsPaid) {
      return obj.paymentstatus === 'FP' || obj.paymentstatus === 'SS';
    } else {
      return false;
    }
  });

  // Filter the data based on the conditions for status
  filteredData = filteredData.filter((obj) => {
    if (containsCompleted && containsProcess) {
      return true; // No need to filter, keep all data
    } else if (containsCompleted) {
      return obj.paymentstatus  === 'SS';
    } else if (containsProcess) {
      return obj.paymentstatus  === 'FP' || obj.paymentstatus  === 'NP' || obj.paymentstatus  === 'PP';
    } else {
      return false;
    }
  });

  // Filter the data based on the selected products
  filteredData = filteredData.filter((item) => selectedProductNames.includes(item.product));


  // Update the salesdata with the filtered data for displaying the top stats
  salesdata = filteredData;
  console.log(salesdata)
  })
</script>


<style>
	.main-container {
		height: 720px;
		display: flex;
		gap: 40px;
		justify-content: center;
		padding: 40px;
		background: #cdd5eb;
	}

	.info-container {
		width: 80%;
		height: max;
    border-radius: 25px;
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
	}

	.ordertable td {
		padding: 1rem 2.5rem;
	}

	.ordertable tr:nth-child(even) {
		background-color: #f2f2f2;
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
	.orders-container{
		height:500px;
		overflow:auto;
	}
</style>

<div class="main-container">
  <div class="info-container">
    <h1>Specific Order Items</h1>
    
    <div class="orders-container">
        {#if salesdata.length > 0}
          <table class="ordertable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Quantity</th>
                <th>Product</th>
                <th>Payment Status</th>
                <th>Order Status</th>
                <th>Amount</th>
              </tr>
            </thead>
              <tbody>
                {#each salesdata as order}
                  <tr>
                    <td>{formatDate(order.date)}</td>
                    <td>{order.sales}</td>
                    <td>{order.product}</td>
                    <td>
                      {#if order.paymentstatus == 'NP' || order.paymentstatus == 'PP'}
                        Unpaid
                      {:else if order.paymentstatus == 'FP' || order.paymentstatus == 'SS'}
                        Paid
                      {/if}
                    </td>
                    <td>
                      {#if order.paymentstatus == 'SS'}
                        Completed
                      {:else}
                        On Process
                      {/if}
                    </td>
                    <td>{order.price}</td>
                  </tr>
                {/each}
              </tbody>
          </table>
        {:else}
          <p>No Orders Found.</p>
        {/if}
      </div>
  
  </div>
  
 
</div>
