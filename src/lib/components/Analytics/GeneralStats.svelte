<script>
    import { onMount, createEventDispatcher } from 'svelte';
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
  onMount(()=>{
    
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

  // Calculate the analytics for the filtered data
  const analytics = calculateAnalytics(filteredData);

  // Update the salesdata with the filtered data for displaying the top stats
  salesdata = filteredData;
   
  })
  



function calculateAnalytics(data) {
  let totalSales = 0;
  let totalRevenue = 0;
  let productRevenueMap = new Map();

  // Calculate total sales and revenue
  for (const item of data) {
    totalSales += item.sales;
    totalRevenue += item.price;
    if (productRevenueMap.has(item.product)) {
      productRevenueMap.set(
        item.product,
        productRevenueMap.get(item.product) + item.price
      );
    } else {
      productRevenueMap.set(item.product, item.price);
    }
  }

  // Find the top 5 products with the maximum revenue
  const topProducts = Array.from(productRevenueMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([product, revenue]) => ({
      product: product,
      totalSalesRevenue: revenue,
      totalQuantitySold: data.filter((item) => item.product === product).reduce((acc, item) => acc + item.sales, 0),
    }));

  // Find the top revenue
  let topRevenue = 0;
  for (const revenue of productRevenueMap.values()) {
    if (revenue > topRevenue) {
      topRevenue = revenue;
    }
  }
  return {
    totalSales: totalSales,
    totalRevenue: totalRevenue,
    topProducts: topProducts,
    topRevenue: topRevenue,
  };
}

</script>

<div class="top-stats">
  <h2>₱{calculateAnalytics(salesdata).totalRevenue}</h2>
  <p>Total Sales Revenue (TSR)</p>
</div>
<div class="top-stats">
  <h2>{calculateAnalytics(salesdata).totalSales} items</h2>
  <p>Total Items Ordered (TIO)</p>
</div>
<div class="top-stats">
  <h2>₱{calculateAnalytics(salesdata).topRevenue}</h2>
  <p>Highest Revenue from a Product</p>
</div>

<style>
   .top-stats {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid #ccc;
    max-width: 250px;
  }

  .top-stats h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .top-stats p {
    font-size: 14px;
    color: #666;
  }
</style>