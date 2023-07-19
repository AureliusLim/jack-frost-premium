<script lang="ts">
	import type { CartItem } from '$lib/types/cart';
	import type { OrderDetails } from '$lib/types/order';
	import { createEventDispatcher,onMount } from 'svelte';
	let name;
	let prodSatisfied = false;
	let ordSatisfied = false;
	let userFirst = false;
	let couponMatch = false;
	onMount(async()=>{
		console.log('mounting')
		const response = await fetch('../api/get-session')
		const data = await response.json()
		if(data.success){
			name = data.name
			console.log(data)
		}
	})
	const dispatch = createEventDispatcher();
	const toProduct = (item: CartItem | OrderDetails) => {
		switch (item.offering?.size_name.toLowerCase()) {
			case 'pint':
				return item.product?.name + '-PNT';
			case 'half-gallon':
				return item.product?.name + '-HG';
			case 'half gallon':
				return item.product?.name + '-HG';
			case 'gallon':
				return item.product?.name + '-GL';
			case 'less sugar':
				return item.product?.name + '-LS';
			default:
				return item.product?.name;
		}
	};
	const handleCouponCodeInput = async(event: InputEvent) => {
		const input = event.target as HTMLInputElement;
		couponCode = input.value;
		couponMatch = false;
		prodSatisfied = false;
		ordSatisfied = false;
		userFirst = false;
		if(couponCode === ''){
			dispatch('empty')
		}
		else{
			dispatch('notempty')
		}
		console.log('Coupon Code:', couponCode);
		const response = await fetch('/api/coupons')
		const data = await response.json()
		if(data.success){
			
			rate = 0;
			for (const element of data.coupons) {
				if (element.code === couponCode && name && element.isActivated) { 
					console.log(element)
					couponMatch = true;
					let prodreq = element.prodRequirement;
					let ordreq = element.quantRequirement;
					prodSatisfied = false;
					ordSatisfied = false;
					userFirst = false;
					//check prodreq
					let prodChecker = 0
					for(let counter = 0; counter < items.length; counter++){
						for(let productname of prodreq){
							if(productname === items[counter].product.name){
								prodChecker += 1
							}
						}
					}
					if(prodChecker === prodreq.length){
						prodSatisfied = true;
					}

					//check ordreq
					let ordChecker = 0;
					for(let counter = 0; counter < items.length; counter++){
						ordChecker += items[counter].quantity
					}
					if(ordChecker >= ordreq){
						ordSatisfied = true;
					}

					//check if user hasn't redeemed it
					let userChecker = 0;
					for(userChecker = 0; userChecker < element.redeemedBy.length; userChecker++){
						if(name === element.redeemedBy[userChecker].email){
							break;
						}
					}

					if(userChecker === element.redeemedBy.length){
						userFirst = true;
					}
		
					if(prodSatisfied && ordSatisfied && userFirst){
							
							rate = element.rate / 100;
							newprice = totalPrice - (totalPrice * rate)
						
							dispatch('couponMatch', {x:newprice, y:element.id})
					}
					break;
				}
			}
		}
	};
	export let items: CartItem[] | OrderDetails[];
	export let totalPrice = 0;
	export let listLabel = 'Order Details';
	let couponCode = "";
	let isSatisfied = false;
	let rate;
	let newprice
</script>

<div class="order-details-container">
	<h3>{listLabel}</h3>
	<div class="table-container">
		<table>
			<tr>
				<th class="th-w">Product</th>
				<th>Qty</th>
				<th>Price</th>
				<th>Amount</th>
			</tr>
			{#each items as item}
				<tr>
					<td class="min-w-[20%] max-w-[20%]">{toProduct(item)}</td>
					<td>{item.quantity}</td>
					<td>{item.offering?.price}</td>
					<td>{(item.quantity * (item.offering?.price ?? 0)).toFixed(2)}</td>
				</tr>
			{/each}
		</table>
	</div>
	<div class="form-container">
		<label for="coupon-code">Coupon Code:</label>
		{#if name}
			<input type="text" id="coupon-code" placeholder="Enter coupon code" bind:value={couponCode} on:input={handleCouponCodeInput} />
		{:else}
			<input type="text" id="coupon-code" placeholder="Log in to use coupon" bind:value={couponCode} on:input={handleCouponCodeInput} disabled={true} />
		{/if}
	</div>
	{#if prodSatisfied && ordSatisfied && userFirst}
			<p>Coupon Available</p>
			<p>Total: &#8369;{totalPrice - (totalPrice * rate)}</p>

	{:else if !prodSatisfied && !ordSatisfied && !userFirst && !couponMatch}
		<p>Total: &#8369;{totalPrice}</p>


	{:else if (!prodSatisfied || !ordSatisfied) && couponMatch}
			<p>You don't meet order requirements</p>
			<p>Total: &#8369;{totalPrice}</p>

	{:else if !userFirst && couponMatch}
		<p>You already redeemed this coupon</p>
		<p>Total: &#8369;{totalPrice}</p>

	{:else}
			<p>Total: &#8369;{totalPrice}</p>
	{/if}
	
</div>

<style lang="postcss">
	.order-details-container {
		@apply flex flex-col items-stretch justify-start font-IstokWeb w-full pr-10 py-4 border-r border-navy-blue;
	}

	.order-details-container > h3 {
		@apply text-start align-bottom text-5xl text-navy-blue w-full pb-6;
	}

	.order-details-container > p {
		@apply text-start align-bottom text-5xl text-navy-blue w-full pt-4 pb-2;
	}

	table {
		@apply w-full border-separate border-spacing-3 text-[#8E8E8E] text-2xl;
	}

	table th,
	table td {
		@apply text-start;
	}

	th {
		@apply sticky top-0 bg-white;
	}

	.table-container {
		@apply w-full max-h-[450px] overflow-y-auto mb-auto;
	}
	.form-container {
		@apply mt-4;
	}

	.form-container label {
		@apply block text-2xl text-navy-blue mb-2;
	}

	.form-container input[type="text"] {
		@apply block h-12 px-4 text-2xl border border-navy-blue rounded outline-none focus:outline-none focus:border-blue-500;
	}
</style>
