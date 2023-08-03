<!-- LineGraph.svelte -->
<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import Chart from 'chart.js/auto';
  import 'chartjs-adapter-date-fns';
  let canvas;
  let ctx;
  export let salesdata;
  export let selectedProductNames;
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
  

  onMount(async () => {
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
    // Preprocess the data to merge sales for duplicate dates (ignoring time)
    const mergedData = salesdata.reduce((acc, curr) => {
      const dateOnly = curr.date.slice(0, 10); // Extract only the date part

      // Check if the current product is included in the selectedProductNames
      if (selectedProductNames.includes(curr.product)) {
        const existingItem = acc.find((item) => item.date === dateOnly);
        if (existingItem) {
          existingItem.sales += curr.sales;
        } else {
          acc.push({ date: dateOnly, sales: curr.sales });
        }
      }

      return acc;
    }, []);
    

    // Wait for the next render cycle to ensure the canvas is rendered
    setTimeout(() => {
      const chartData = {
        labels: mergedData.map((item) => new Date(item.date)), // Convert date strings to Date objects
        datasets: [
          {
            label: 'Sales',
            data: mergedData.map((item) => item.sales),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      };

      const chartOptions = {
        scales: {
          x: {
            type: 'time', // Use time scale for x-axis
            time: {
              unit: 'day', // Display data by day, 
              tooltipFormat: 'yyyy-MM-dd', // Format for tooltip display
            },
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Sales',
            },
          },
        },
      };

      canvas = new Chart(ctx, {
        type: 'line', // Set the chart type to line
        data: chartData,
        options: chartOptions,
      });

    
    }, 0); // Use a timeout to ensure the canvas is rendered before Chart.js initializes
  });
 
</script>

<div class='chart-container'>
  <canvas id="myChart" bind:this={ctx} width="80%" height="20%"></canvas>
</div>

<style>
  .chart-container{
    width:100%;
  }
</style>
