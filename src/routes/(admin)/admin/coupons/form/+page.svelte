<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import Couponform from '$lib/components/Forms/Couponform.svelte';
	import LeaveConfirmationModal from '$lib/components/Modal/Confirmation.svelte';
	import StatusModal from '$lib/components/Modal/Status.svelte';
  
  let products = [];
  const orderCounts = [0, 1, 2, 3, 4, 5];
  let modalMsg = ""
  let couponName = '';
  let code = '';
  let discountedAmount = '';
  let productRequirement = '';
  let orderCountRequirement = '';
  let isActivated = false;
  let variable;
 
	const confirmationHeader = 'DISCARD COUPON?';
	const confirmationDetails =
		'The coupon you’ve added/edited will not be saved if you leave this page without saving.';
	const cancelLabel = 'Stay on this Page';
	const confirmLabel = 'Leave this Page';
	let statusHeader = '';
	let statusInfo = '';
	let isAboutToLeave = false;
	let success = false;
	let loading = false;
	let warning = false;

  let couponObj = {};
  onMount(async() => {
    modalMsg = "";
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
    if(data.success){
      console.log("COUPON ADDED")
      goto('/admin/coupons')
    }
    else{
      modalMsg = "Input Fields are Invalid"
    }
   
  };

  const editCoupon = async(event)=>{
    loading = true;
		statusHeader = 'FOR A MOMENT...';
		statusInfo = 'Adding coupon...';

    let coupon = event.detail
    const response = await fetch('/api/coupons/edit',{
      method:'POST',
      headers:{
        'Content-type': 'application.json',
      },
      body:JSON.stringify({coupon:coupon})
    })
    const data = await response.json();
    loading = false;
    if(data.success){
      console.log("COUPON edited")
      success = true;
      await successEdit();
    }
    else{
      warning = true;
      statusHeader = 'COUPON NOT SAVED';
			statusInfo = 'Coupon name or code already exists!';
      setTimeout(() => {
        warning = false;
        statusHeader = '';
        statusInfo = '';
			}, 3000);
    }
   
    
  }

  const successEdit = async () => {
		success = true;
    statusHeader = 'COUPON SAVED';
    statusInfo = "The coupon you've made has been saved";

    setTimeout(function() {
      goto('/admin/coupons');
    }, 1000);
	};

  const leaveConfirmation = () => {
    isAboutToLeave = true;
  };

  const cancelLeave = () => {
		isAboutToLeave = false;
	};

  const goBack = () => {
    isAboutToLeave = false;
    goto('/admin/coupons')
  };

</script>

{#if variable} <!-- for edit coupon  -->
  <Couponform modalMsg = {modalMsg} couponName={couponObj.name} code={couponObj.code}  discountedAmount={couponObj.rate} productRequirement={couponObj.prodRequirement} orderCountRequirement={couponObj.quantRequirement} isActivated={couponObj.isActivated} variable={variable}
  on:save={saveCoupon}
  on:back={leaveConfirmation}
  on:edit={editCoupon}
  />

{:else} <!-- for add coupon  -->
  <Couponform modalMsg = {modalMsg} couponName='' code=''  discountedAmount=0 productRequirement='' orderCountRequirement='' isActivated={false} variable={variable}
    on:save={saveCoupon}
    on:back={leaveConfirmation}
    on:edit={editCoupon}
  />
{/if}

{#if isAboutToLeave}
  <LeaveConfirmationModal
  {confirmationHeader}
  {confirmationDetails}
  {cancelLabel}
  {confirmLabel}
  on:cancel={cancelLeave}
  on:confirm={goBack}
  />
{/if}

{#if success || loading || warning}
	<StatusModal {success} {loading} {warning} {statusHeader} {statusInfo} />
{/if}



