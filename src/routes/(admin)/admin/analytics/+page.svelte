<script lang='ts'>
  import type { PageData } from './$types';
  export let data: PageData;

  // Function to calculate total sales
  const calculateTotalSales = () => {
    let totalSales = 0;
    for (const order of data.order) {
      totalSales += Number(order.total_price) || 0;
    }
    return totalSales;
  };

  // Function to calculate total products ordered
  const calculateTotalProductsOrdered = () => {
    let totalProductsOrdered = 0;
    for (const order of data.order) {
      for (const orderDetail of order.order_details) {
        totalProductsOrdered += orderDetail.quantity || 0;
      }
    }
    return totalProductsOrdered;
  };

  // Function to find the top-selling product
  const findTopSellingProduct = () => {
    const productSalesMap = new Map();
    for (const order of data.order) {
      for (const orderDetail of order.order_details) {
        const productName = orderDetail.product.name;
        const quantity = orderDetail.quantity;
        if (productName && quantity) {
          if (productSalesMap.has(productName)) {
            productSalesMap.set(productName, productSalesMap.get(productName) + quantity);
          } else {
            productSalesMap.set(productName, quantity);
          }
        }
      }
    }
    // Find the product with the maximum sales
    let topProductName = '';
    let maxSales = 0;
    for (const [productName, sales] of productSalesMap) {
      if (sales > maxSales) {
        topProductName = productName;
        maxSales = sales;
      }
    }
    return topProductName;

    
  };

  const totalSales = calculateTotalSales();
  const totalProductsOrdered = calculateTotalProductsOrdered();
  const topSellingProduct = findTopSellingProduct();
 

</script>
<h2>Total Sales: {totalSales}</h2>
<h2>Total Products Ordered: {totalProductsOrdered}</h2>
<h2>TOP selling product:{topSellingProduct}</h2>