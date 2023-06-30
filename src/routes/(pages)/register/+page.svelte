<script lang="ts">
	import jfpLogo from '$lib/assets/logos/jack-frost-premium.png';
	import type { PageData, ActionData } from './$types';
  import { goto } from '$app/navigation';
	export let form: ActionData;
	let passwordFail = false;
	let emailFail = false;
	console.log(form)
	try{
			if(form.message === 'Passwords do not match.'){
			passwordFail = true;
		}
		else if(form.message === 'Email is already registered.'){
			emailFail = true;
		}
	}catch(err){

	}

	console.log("Email:" + emailFail)
	console.log("Pass:" + passwordFail)
</script>

<svelte:head>
	<title>User Register | Jack Frost Premium Ice Cream</title>
</svelte:head>

	<div class="max-w-full justify-cente flex min-h-min relative justify-center">
		<div class="wrapper">
			<div class="logo">
				<img class="w-100 h-40" src={jfpLogo} alt="JackFrostlogo" />
			</div>
		</div>
		<div class="main-container">
	
			<div class="form-container">
				
				<form method="POST">
					<h1>Create an Account</h1>
					<div class="column-container">
						<div class="column">
							<p class="w-full"> Name </p>
							<div class="mt-3 mb-5 flex gap-x-3 w-full">
								<!-- First Name -->
								<div class="w-1/2">
									<input
									class=""
									type="text"
									id="firstName"
									name="firstName"
									placeholder="First Name"
									required
								/>
								</div>
								
								<!-- Last Name -->
								<div class="w-1/2">
									<input
									type="text"
									id="lastName"
									name="lastName"
									placeholder="Last Name"
									required
									/>
								</div>
							</div>
							
							<!-- Contact Number -->
							<p class="w-full">Contact Number</p>
							<div class="mt-3 mb-5 flex w-full">
								<input
									type="text"
									id="contactNumber"
									name="contactNumber"
									placeholder="+63"
									required
								/>
							</div>
							
							<p class="w-full">Address</p>
							<div class="mt-3 mb-5 flex gap-x-3 w-full">
								<!-- Street -->
								<div class="w-1/3">
									<input
									type="text"
									id="street"
									name="street"
									placeholder="Street"
									required
									/>
								</div>
	
								<!-- City/Province -->
								<div class="w-2/3">
									<input
									type="text"
									id="cityProvince"
									name="cityProvince"
									placeholder="City/Province"
									required
									/>
								</div>
							</div>
							
							<div class="mt-3 mb-5 flex gap-x-3 w-full">
								<!-- Building No -->
								<div class="w-2/3">
									<input
									type="text"
									id="buildingNumber"
									name="buildingNumber"
									placeholder="Building/Floor/Unit Number"
									required
								/>
								</div>
	
								<!-- Postal Code -->
								<div class="w-1/3">
									<input
									type="text"
									id="postalCode"
									name="postalCode"
									placeholder="Postal Code"
									required
									/>
								</div>
							</div> 
						</div>

						<div class="column" style="height:50%">

							<!-- Email Addr -->
							<p class="w-full">Email Address</p>
							<div class="mt-3 mb-5 flex w-full">
								<input
									type="email"
									id="email"
									name="email"
									required
								/>
							</div>

							<p class="w-full">Password</p>
							<div class="mt-3 mb-5 flex w-full">
								<input
									type="password"
									id="password"
									name="password"
									required
								/>
							</div>

							<p class="w-full">Confirm Password</p>
							<div class="mt-3 mb-5 mb-auto flex w-full">
								<input
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									required
								/>
							</div>
						</div>
					</div>
					{#if emailFail}
								<p class="error">{form.message}</p>
						{/if}

						{#if passwordFail}
								<p class="error">{form.message}</p>
						{/if}
					<div class="button-container">
						
						<button class="cancel-button" on:click={() => goto('/profile')}>Cancel</button>
						<button class="reg-button">Register</button>
					</div>
				</form>
				
			</div>
		</div>
	</div>

<style>

	.wrapper{
		position: absolute;
		margin-left: auto;
  	margin-right: auto;
		max-height: 10px;
	}

	.logo{
		margin-top: 20%;
	}

	.main-container {
		height: 950px;
		display: flex;
		gap: 40px;
		justify-content: center;
		padding: 40px;
		background: #352F75;
	}

	.form-container {
		display: flex;
		width: 60%;
		height: 70%;
		border: 5px solid;
		padding: 100px 50px 70px 50px;
		align-items: center;
		justify-items: center;
		margin-top: auto;
		margin-bottom: auto;
	
		background: #FFF;
		border: none;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	}

	h1 {
		color: #352F75;
		font-size: 40px;
		font-weight: 700;
		text-align: center;
	}

	.column {
		margin-top: 20px;
		margin-bottom: 10px;
		display: flex;
		flex-wrap: wrap;
		width: 50%;
		flex-basis: 50%;
	}

	.column-container{
		display: flex;
		flex-direction: row;
		gap: 60px;
	}

	p {
		color: #352F75;
		font-weight: 700;
	}

	input {
		height: 29px;
		width: 100%;
		border-radius: 15px;
		background: #f1f1f1;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

		text-indent: 15px;
		color: #383d55;
		font-weight: 500;
	}

	input:focus {
		outline: 3px solid #cdd5eb;
	}

	.button-container{
		display: flex;
		align-items: right;
		justify-content: right;
		margin-top: 30px;
		gap: 5px;
	}

	.reg-button {
		width: 180px;
		padding: 5px;
		border-radius: 20px;
		background: #383d55;
		color: #fff;
	}

	.cancel-button {
		width: 180px;
		padding: 5px;
		border-radius: 20px;
		border: 1.5px solid #383d55;
		background: #fff;
		color: #383d55;
	}
	.error {
    text-align: right;
    color: red;
  }
	

</style>