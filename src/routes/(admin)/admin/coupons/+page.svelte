<script lang="ts">
  import { goto } from '$app/navigation';
  import {onMount, onDestroy } from 'svelte';
	import type { PageServerData } from './$types';
  import { createEventDispatcher } from 'svelte';
  import CouponsTable from '$lib/components/Coupons/CouponsTable.svelte'
  import AddIcon from '$lib/components/Buttons/Add.svelte';


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

<div class="main-container">
  <div class="info-container">
    <div class="header-container">
      <h1>My Orders</h1>
      <button on:click={()=>{goto('/admin/coupons/form')}}>
        <AddIcon label='' iconSize = 'w-11 h-11'/>
      </button>
    </div>
    <div class="table-container">
      <CouponsTable class="table" data={couponslist} on:delete={deleteCoupon} on:edit={editCoupon}/>
    </div>
  </div>
</div>


<style>
  .main-container {
    width: 100vw;
    min-height: 100vh;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #CDD5EB;
    overflow: hidden;
    overflow-y: auto;

    color: #383d55;
		font-family: Istok Web;
  }

  .info-container {
		width: 70%;
		height: max;
    margin-top: 28px;
		color: #383d55;
		font-family: Istok Web;
	}
  
  .header-container {
    display: flex;
    gap: 20px;
  }

  h1 {
		font-size: 29px;
		font-weight: bold;
    margin-top: 5px;
    text-align: left;
	}

  .table-container{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
  }

  /* .add-coupon-button {
    margin: 20px 0px 20px 0px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #333;
    color: #fff;
    cursor: pointer;
  } */


</style>
