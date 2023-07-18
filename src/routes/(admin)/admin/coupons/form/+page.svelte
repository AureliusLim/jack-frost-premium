<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import Couponform from '$lib/components/Forms/Couponform.svelte';
  let products = [];
  const orderCounts = [0, 1, 2, 3, 4, 5];

  let couponName = '';
  let code = '';
  let discountedAmount = '';
  let productRequirement = '';
  let orderCountRequirement = '';

  let isActivated = false;
  let variable;
  let couponObj = {};
  onMount(async() => {
    const urlParams = new URLSearchParams(window.location.search);
    variable = urlParams.get('variable') || '';
    console.log(variable)
    if(variable){
      const res = await fetch('/api/coupons');
      const r = await res.json();
      for(let c = 0; c < r.coupons.length; c++){
        if(variable === r.coupons[c].name){
          couponObj = r.coupons[c]
          break;
        }
      }
      console.log(couponObj)
    }
  });
  const dispatch = createEventDispatcher();
 
  const saveCoupon = async(event) => {
    let coupon = event.detail
    const response = await fetch('/api/coupons/add',{
      method:'POST',
      headers:{
        'Content-type': 'application.json',
      },
      body:JSON.stringify({coupon:coupon})
    })
    const data = await response.json();
    console.log("COUPON ADDED")
    goto('/admin/coupons')
  };

  const editCoupon = async(event)=>{
    let coupon = event.detail
    const response = await fetch('/api/coupons/edit',{
      method:'POST',
      headers:{
        'Content-type': 'application.json',
      },
      body:JSON.stringify({coupon:coupon})
    })
    const data = await response.json();
    if(data.success){
      console.log("COUPON edited")
    }
   
    goto('/admin/coupons')
  }
  

  

  const goBack = () => {
    goto('/admin/coupons')
  };
</script>

{#if variable}
  <Couponform couponName={couponObj.name} code={couponObj.code}  discountedAmount={couponObj.rate} productRequirement={couponObj.prodRequirement} orderCountRequirement={couponObj.quantRequirement} isActivated={couponObj.isActivated} variable={variable}
  on:save={saveCoupon}
  on:back={goBack}
  on:edit={editCoupon}
  />
{:else}
  <Couponform couponName='' code=''  discountedAmount=0 productRequirement='' orderCountRequirement='' isActivated={false} variable={variable}
    on:save={saveCoupon}
    on:back={goBack}
    on:edit={editCoupon}
  />
{/if}


