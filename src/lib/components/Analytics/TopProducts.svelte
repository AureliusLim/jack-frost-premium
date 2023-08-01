<script>
  import {onMount} from 'svelte';
  let topProductsarr = [];
  export let salesdata;
  export let selectedProductNames;
  onMount(()=>{
    
    salesdata = filterSalesData()
    calculateAnalytics(salesdata)
    
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

  // Find the top 5 products 
  const topProducts = Array.from(productRevenueMap.entries())
  .sort((a, b) => {
    const [productA, revenueA] = a;
    const [productB, revenueB] = b;
    const quantitySoldA = data.filter((item) => item.product === productA).reduce((acc, item) => acc + item.sales, 0);
    const quantitySoldB = data.filter((item) => item.product === productB).reduce((acc, item) => acc + item.sales, 0);
    return quantitySoldB - quantitySoldA; // Sort in descending order based on quantity sold
  })
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
  console.log(topProducts)
  topProductsarr = topProducts
  return {
    totalSales: totalSales,
    totalRevenue: totalRevenue,
    topProducts: topProducts,
    topRevenue: topRevenue,
  };
}
</script>

<div class='topProducts-container'>
  <h2>Top Products Sold</h2>
  {#each topProductsarr as product, index}
  <hr>
    <p>{index+1} {product.product}</p>
    <p>(TSR): {product.totalSalesRevenue} (TIO): {product.totalQuantitySold} units</p>

  {/each}
</div>

<style>
  .topProducts-container{
    width:200px;
  }
  
</style>