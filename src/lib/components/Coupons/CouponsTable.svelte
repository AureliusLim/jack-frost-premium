<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';
	
  export let data;


  // Event dispatcher for editing and deleting coupons
  const dispatch = createEventDispatcher();

  // Function to handle coupon deletion
  const deleteCoupon = (couponId) => {
    // Dispatch 'delete' event with the coupon ID
    dispatch('delete', couponId);
  };

  // Function to handle coupon editing
  const editCoupon = (couponId) => {
    // Dispatch 'edit' event with the coupon ID
    dispatch('edit', couponId);
  };
  console.log(data)
</script>

<svelte:head>
  <title>Coupons | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="coupon-page-container">
  <table class="coupons-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Code</th>
        <th>Status</th>
        <th>Amount</th>
        <th>Requirements</th>
        <th>Redeemed</th>
        <th></th> <!-- Empty header for edit column -->
      </tr>
    </thead>
    <tbody>
      {#each data as coupon}
        <tr>
          <td>{coupon.name}</td>
          <td>{coupon.code}</td>
          {#if coupon.isActivated}
            <td>Activated</td>
          {:else}
            <td>Deactivated</td>
          {/if}
          <td>{coupon.rate}</td>
          {#if coupon.prodRequirement.length > 0}
            <td>{coupon.prodRequirement} + {coupon.quantRequirement} Orders</td>
          {:else}
            <td>Any Product + {coupon.quantRequirement} Orders</td>
          {/if}
          {#if coupon.redeemedBy}
            <td>{coupon.redeemedBy.length}</td>
          {:else}
            <td>0</td>
          {/if}
          
          <td>
            
              <button on:click={() => editCoupon(coupon.name)}>      
                Edit
              </button>
            
          </td>
          <td>
           
              <button on:click={() => deleteCoupon(coupon.id)}>
                Delete
              </button>
            
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>


  .coupons-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border: 1px solid #ddd;
  }

  .coupons-table th,
  .coupons-table td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
  }

  .coupons-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .coupons-table button {
    background: none;
    border: none;
    cursor: pointer;
    color: blue;
    text-decoration: underline;
  }
</style>
