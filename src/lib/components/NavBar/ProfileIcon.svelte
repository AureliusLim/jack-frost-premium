<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import { goto } from '$app/navigation';
	import Toasts from '$lib/components/Toast/List.svelte';
	import { beforeUpdate } from 'svelte';
	const hoveroverProfileIcon = () => {
		dispatch('open');
	};

	export const IsLoggedIn = false;
	let ProfileIconisHovered = false;
	beforeUpdate(async () => {
		console.log('MOUNTING');
		try {
			const response = await fetch('api/get-session');
			const data = await response.json();

			if (data.role == 'USER') {
				email = data.name;
			}
			if (!data.name) {
				email = '';
			}

			// Fetch the orders from the API
		} catch (error) {
			console.error(error);
		}
	});

	const openLogin = () => {
		loginForm = true;
		registerForm = false;
		dispatch('loginmodal');
		console.log('opening login');
	};
	const closeLogin = async () => {
		loginForm = false;
		const response = await fetch('api/get-session');
		let data = await response.json();
		if (data.name) {
			email = data.name;
			console.log(data);
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
	const handleLogout = async () => {
		const response = await fetch('api/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: 'Logged out'
		});
		email = '';
		console.log('LOGGED OUT');
		goto('/');
	};
	let isViewingCart = false;
	let loginForm = false;
	let registerForm = false;
	let email = '';
</script>

<Toasts />

<div
	class="ProfileIconHoverChangeColor dropdown-container"
	on:mouseenter={() => (ProfileIconisHovered = true)}
	on:mouseleave={() => (ProfileIconisHovered = false)}
>
	<button>
		<svg
			version="1.0"
			xmlns="http://www.w3.org/2000/svg"
			width="25.000000pt"
			height="25.000000pt"
			viewBox="0 0 512.000000 512.000000"
			preserveAspectRatio="xMidYMid meet"
		>
			<g
				transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
				fill={ProfileIconisHovered ? '#535353' : '#666666'}
				stroke="none"
			>
				<path
					d="M2335 5105 c-273 -42 -517 -172 -708 -375 -210 -223 -319 -481 -334
				-790 -21 -432 191 -845 557 -1084 180 -118 353 -178 563 -195 389 -30 721 92
				989 365 213 216 321 452 347 753 36 402 -116 776 -419 1038 -196 168 -376 252
				-625 288 -120 17 -260 18 -370 0z"
				/>
				<path
					d="M1427 2639 c-452 -48 -766 -372 -912 -944 -97 -381 -122 -839 -60
				-1090 51 -201 218 -405 411 -503 87 -44 212 -80 317 -92 62 -8 534 -10 1437
				-8 l1345 3 85 24 c316 86 532 298 611 596 41 155 36 525 -12 817 -105 650
				-371 1040 -792 1162 -96 28 -268 49 -319 39 -49 -9 -117 -45 -271 -144 -164
				-106 -187 -118 -310 -164 -142 -53 -259 -76 -396 -76 -140 0 -248 20 -390 70
				-134 48 -140 51 -350 184 -110 70 -192 115 -224 124 -56 14 -56 14 -170 2z"
				/>
			</g>
		</svg>
	</button>
	{#if ProfileIconisHovered}
		<div class="dropdown-menu">
			{#if !email}
				<p><button on:click={openLogin}>Login</button></p>
				<p><button on:click={openRegister}>Register</button></p>
			{/if}
			{#if email}
				<p><button on:click={() => goto('/profile')}>My Profile</button></p>
				<p><button on:click={() => goto('/myorders')}>My Orders</button></p>
				<p><button on:click={handleLogout}>Logout</button></p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.ProfileIconHoverChangeColor {
		fill: #535353;
	}
	.dropdown-container {
		position: relative;
		display: inline-block;
	}

	.dropdown-menu {
		display: none;
		position: absolute;
		top: calc(100% + 0px);
		left: 50%;
		transform: translateX(-50%);
		background-color: white;
		padding: 8px;
		z-index: 1;
		width: 200px;
		text-align: center;
		box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.5);
		border-radius: 8px;
		color: #36305e;
	}

	.dropdown-container:hover .dropdown-menu {
		display: block;
	}

	.dropdown-menu p {
		margin: 0;
		padding: 8px;
		border-bottom: 1px solid #36305e;
	}

	.dropdown-menu p:last-child {
		border-bottom: none;
	}
</style>
