<script lang="ts">
	// import { SystemDrive } from '$env/static/private';

  // import { goto } from '$app/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import DeleteIcon from '$lib/components/Buttons/Delete.svelte';
  import EditIcon from '$lib/components/Buttons/Edit.svelte';
	
  export let data = [];


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
  console.log(data[0]);
</script>

<svelte:head>
  <title>Coupons | Jack Frost Premium Ice Cream</title>
</svelte:head>

  <table class="coupons-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Code</th>
        <th>Status</th>
        <th>Amount</th>
        <th>Requirements</th>
        <th>Redeemed</th>
        <th></th>
        <th></th>
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
              <button id = "edit" on:click={() => editCoupon(coupon.name)}>      
                <EditIcon label='' iconSize = 'w-8 h-8'/>
              </button>
            </td>
            <td>
              <button on:click={() => deleteCoupon(coupon.id)}>
                <DeleteIcon label='' iconSize = 'w-6 h-6'/>
              </button>
            </td>
        </tr>
      {/each}
    </tbody>
  </table>

<style>
  .coupons-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    padding: 1rem 2.5rem;
  }

  .coupons-table th,
  .coupons-table td {
    padding: 8px 20px;
    text-align: left;
  }

  .coupons-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .coupons-table tr:nth-child(even) {
		background-color: #f2f2f2;
	}

  .coupons-table td:nth-child(7),
  .coupons-table td:nth-child(8),
  .coupons-table th:nth-child(7),
  .coupons-table th:nth-child(8) {
    border :none;
    background-color: #CDD5EB;
    text-align: right;
  }

</style>
