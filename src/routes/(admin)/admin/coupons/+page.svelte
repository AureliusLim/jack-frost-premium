<script lang="ts">
  import { goto } from '$app/navigation';
  import {onMount, onDestroy } from 'svelte';
	import type { PageServerData } from './$types';
  import { createEventDispatcher } from 'svelte';
  import CouponsTable from '$lib/components/Coupons/CouponsTable.svelte'


  export let data: PageServerData;
  console.log("THEDATA:"+data.coupons)
  let couponslist = data.coupons
  const deleteCoupon = async(event)=>{
    let coupon = event.detail
    const response = await fetch('/api/coupons/delete',{
      method:'POST',
      headers:{
        'Content-type':'application.json',
      },
      body:JSON.stringify({ID:coupon})
    })
    let data = await response.json()
    if(data.success){
      let coupons = await fetch('/api/coupons');
      let newdata = await coupons.json()
      couponslist= newdata.coupons
     
    }
  }
  const editCoupon = async(event)=>{
    let coupon = event.detail
    console.log(coupon)
    const variable = coupon;
    //goto('coupons/form')
    goto('coupons/form?variable=' + encodeURIComponent(variable));
  }
  
</script>

<svelte:head>
  <title>Sections | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="coupon-page-container">
  <button class="add-coupon-button" on:click={()=>{goto('/admin/coupons/form')}}>Add Coupon</button>
  <CouponsTable data={couponslist} on:delete={deleteCoupon} on:edit={editCoupon}/>
</div>

<style>
  .coupon-page-container {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #CDD5EB;
    overflow: hidden;
    overflow-y: auto;
  }
  .add-coupon-button {
    margin: 20px 0px 20px 0px;

    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #333;
    color: #fff;
    cursor: pointer;
  }

</style>
