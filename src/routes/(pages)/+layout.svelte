<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import NavBar from '$lib/components/NavBar/index.svelte';
	import Footer from '$lib/components/Footer/index.svelte';
	import ShoppingCartModal from '$lib/components/Modal/ShoppingCart.svelte';
	import Toasts from '$lib/components/Toast/List.svelte';
	import CartStore from '$lib/stores/cart';
	import LoginModal from '$lib/components/Modal/LoginModal.svelte';
	import { onMount } from 'svelte';
	import { beforeUpdate } from 'svelte';
	beforeUpdate(async () => {
    console.log("MOUNTING")
    try {
      const response = await fetch('api/get-session');
      const data = await response.json();
			
			if(data.role == "USER"){
				email = data.name;
			}
			if(!(data.name)){
				email= "";
			}
     
      // Fetch the orders from the API
    } catch (error) {
      console.error(error);
    }
  });
	onMount(async () => {
    console.log("MOUNTING")
    try {
      const response = await fetch('api/get-session');
      const data = await response.json();
			
			if(data.role == "USER"){
				email = data.name;
			}
			if(!(data.name)){
				email= "";
			}
     
      // Fetch the orders from the API
    } catch (error) {
      console.error(error);
    }
  });
	const openCart = () => {
		isViewingCart = true;
		console.log('opening cart');
	};

	const closeCart = () => {
		isViewingCart = false;
		console.log('closing cart');
	};

	const openLogin = () => {
		loginForm = true;
		registerForm = false;
		console.log('opening login');
	};

	const closeLogin =async() => {
		loginForm = false;
		const response = await fetch('api/get-session');
		let data = await response.json()
		if (data.name){
			email = data.name;
			console.log(data)
		}
		
		console.log('closing login');
	};

	const openRegister = () => {
		goto('/register');
		console.log('opening register');
	};

	const closeRegister = () => {
		registerForm = false;
		console.log('closing register');
	};
	const handleLogout = async() =>{
		const response = await fetch('api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: "Logged out",
      });
			email = "";
			console.log("LOGGED OUT")
			goto("/")
	}
	let isViewingCart = false;
	let loginForm = false;
	let registerForm = false;
	let email = "";
	export let data: LayoutData;
	
</script>
{#if !email}
<button on:click={openLogin}>Login</button>
{/if}
{#if email}
<button on:click={handleLogout}>Logout</button>
<button on:click={() => goto('/myorders')}>My Orders</button>
{/if}
<button on:click={openRegister}>Register</button>
<p>{email}</p>

<Toasts />

<NavBar {data} on:open={openCart} hasCartItem={$CartStore.count > 0}/>

	<slot />
{#if $page.url.pathname !== '/contact' && $page.url.pathname !== '/order/confirmation' && $page.url.pathname.search('checkout') === -1}
	<Footer {data} />
{/if}

{#if isViewingCart}
	<ShoppingCartModal cart={$CartStore} on:close={closeCart} />
{/if}

{#if loginForm}
	<LoginModal on:close={closeLogin}/>
{/if}

