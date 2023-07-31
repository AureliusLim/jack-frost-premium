<!-- LineGraph.svelte -->
<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import Chart from 'chart.js/auto';
  import 'chartjs-adapter-date-fns';
  let canvas;
  let ctx;
  // Sample data with actual date strings
  export let salesdata;
  export let selectedProductNames;
  const dispatch = createEventDispatcher();
  onMount(async () => {
    
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
  <canvas id="myChart" bind:this={ctx} width="500px" height="300px"></canvas>
</div>

<style>
  .chart-container{
    width:500px;
  }
</style>
