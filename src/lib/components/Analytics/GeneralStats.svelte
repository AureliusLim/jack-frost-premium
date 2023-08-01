<script>
    import { onMount, createEventDispatcher } from 'svelte';
  export let selectedProductNames;
  export let salesdata;
  
  onMount(()=>{
    console.log(salesdata)
    salesdata = filterSalesData()
    
  })
  function filterSalesData() {
    return salesdata.filter((item) => selectedProductNames.includes(item.product));
}
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