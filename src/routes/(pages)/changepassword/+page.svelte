<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import ConfirmationModal from '$lib/components/Modal/Confirmation.svelte';

	let pass = {};
	let isEditing = false;
	let modalOn = false;
	let status = '';
	onMount(async () => {
		console.log('MOUNTING');
		status = '';
		try {
			const response = await fetch('api/get-userdetails');
			const data = await response.json();
			userdetails = data;
			// Fetch the orders from the API
		} catch (error) {
			console.error(error);
		}
	});

	const handleLogout = async () => {
		const response = await fetch('api/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: 'Logged out'
		});

		console.log('LOGGED OUT');
		goto('/');
	};

	const handleConfirm = () => {
		modalOn = true;
	};

	const handleModalConfirm = async () => {
		modalOn = false;
		isEditing = false;

		// Create the request body
		const requestBody = {
			old: pass.old,
			new: pass.new,
			confirmation: pass.confirm
		};

		try {
			const response = await fetch('api/edit-password', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			});
			let data = await response.json();
			status = data.message;
			console.log(data);

			// location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const handleModalCancel = () => {
		modalOn = false;
	};
</script>

<svelte:head>
	<title>My Orders | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="max-w-full flex flex-col min-h-min">
	<div class="main-container">
		<div class="side-menu">
			<button on:click={() => goto('/profile')}>Profile Information</button>
			<button on:click={() => goto('/changepassword')}>Change Password</button>
			<button on:click={() => goto('/myorders')}>My Orders</button>
			<button on:click={handleLogout}>Sign Out</button>
		</div>

		<div class="info-container">
			<div class="profile-wrapper">
				<form id="userinfo">
					<h1>Change Password</h1>
					<p class="message">{status}</p>

					<div class="info-grid">
						<div class="info-item">
							<p class="label">Old Password</p>
							<input class="form-input" type="password" id="oldpass" bind:value={pass.old} />
						</div>

						<div class="info-item">
							<!-- i dont know how else to force create space -->
						</div>

						<div class="info-item">
							<p class="label">New Password</p>
							<input class="form-input" type="password" id="newpass" bind:value={pass.new} />
						</div>
						<div class="info-item">
							<p class="label">Confirm Password</p>
							<input
								class="form-input"
								type="password"
								id="confirmpass"
								bind:value={pass.confirm}
							/>
						</div>

						<div class="button-container">
							<button class="form-button" on:click={handleConfirm}>Change Password</button>
						</div>
					</div>
				</form>

				{#if modalOn}
					<ConfirmationModal
						confirmationHeader=""
						confirmationDetails="Are you sure you want to make the changes?"
						cancelLabel="Cancel"
						confirmLabel="Confirm"
						on:confirm={handleModalConfirm}
						on:cancel={handleModalCancel}
					/>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.main-container {
		width: 1920px;
		height: 720px;
		display: flex;
		gap: 40px;
		justify-content: center;
		padding: 40px;
		background: #cdd5eb;
	}

	.side-menu {
		width: 250px;
		height: 423px;
		padding-top: 20px;
		display: flex;
		flex-direction: column;
		background: #fff;
		color: #383d55;
		font-family: Istok Web;
		font-weight: 700;
	}

	.info-container {
		width: 1620px;
		height: max-content; /* Change height to max-content to adjust based on content size */
		border: 1px solid white;
		padding: 10px;
		background: #fff;
		color: #383d55;
		font-family: Istok Web;
		font-weight: 700;
	}

	.profile-wrapper {
		padding: 30px;
		font-size: 17px;
	}

	h1 {
		font-size: 29px;
		font-weight: bold;
	}

	.form-input {
		border: 1px solid black;
	}

	.info-grid {
		margin-top: 20px;
		margin-bottom: 10px;
		display: flex;
		flex-wrap: wrap;
	}

	.info-item {
		margin-bottom: 40px;
		flex-basis: 50%;
	}

	.password-fields {
		display: flex;
		gap: 10px;
	}

	.button-container {
		display: flex;
		align-items: flex-end; /* Change align-items to flex-end to align buttons at the bottom */
		justify-content: flex-end; /* Change justify-content to flex-end to align buttons at the bottom */
		margin-top: 30px;
	}

	.form-button {
		width: 180px;
		padding: 5px;
		border-radius: 20px;
		background: #383d55;
		color: #fff;
	}
</style>
