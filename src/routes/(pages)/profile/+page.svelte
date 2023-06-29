<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import ConfirmationModal from '$lib/components/Modal/Confirmation.svelte';
  import CustomerSuccess from '$lib/components/Alert/CustomerSuccess.svelte';
  import CustomerError from '$lib/components/Alert/CustomerError.svelte';

  let userdetails = {};
  let isEditing = false;
  let editModalOn = false;
  let cancelModalOn = false;
  let alertOn = false;
  let successEdit;
  let message = "";

  onMount(async () => {
    console.log("MOUNTING")
    try {
      const response = await fetch('api/get-userdetails');
      const data = await response.json();
      userdetails = data;
      
     
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
  const handleConfirm = ()=>{
    editModalOn = true;
  }
  const handleEdit = ()=>{
    isEditing = true;
  }
  const handleCancel = ()=>{
    isEditing = true;
    cancelModalOn = true;
  }
  const handleModalConfirmEdit = async ()=>{
    editModalOn = false;
    isEditing = false;
   
    // Create the request body
    const requestBody = {
      firstName: userdetails.firstName,
      lastName: userdetails.lastName,
      email: userdetails.email,
      contactNumber: userdetails.contactNumber,
      street: userdetails.street,
      cityProvince: userdetails.cityProvince,
      buildingNumber: userdetails.buildingNumber,
      postalCode: userdetails.postalCode
    };
    try{
      const response = await fetch('api/edit-userdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      let data = await response.json();
      //console.log(data.message);
      successEdit = data.success;
  
      if(successEdit == false){
        message = "The email is already registered to another account.";
        //reset all fields back
        try {
          const response = await fetch('api/get-userdetails');
          const data = await response.json();
          userdetails = data;
          
        
        } catch (error) {
          console.error(error);
        }
      }
      else{
        message = "Details successfully updated."
      }
      alertOn = true;
    }
    catch(error){
      console.log(error)
    }
   
  }
  const handleModalCancelEdit = ()=>{
    editModalOn = false;
    isEditing = true;
  }

  const handleModalCancelCancel = ()=>{
    cancelModalOn = false;
    isEditing = true;
  }

  const handleAlertClose = () => {
    alertOn = false;
    console.log(alertOn)
  }
 
</script>

<svelte:head>
	<title>My Orders | Jack Frost Premium Ice Cream</title>
</svelte:head>

<style>
	.main-container {
		height: 720px;
		display: flex;
		gap: 40px;
		justify-content: center;
		padding: 40px;
		background: #cdd5eb;
	}

	.side-menu {
		width: 20%;
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
		width: 80%;
		height: max;
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

  .top-container {
    width: max;
    display: flex;
  }
  .h1-container{
    width: 30%;
  }

  .prompt-container{
    width: 70%;
    display: flex;
    align-items: right;
    justify-content: right;
  }

  h1 {
    font-size: 29px;
    font-weight: bold;
  }

	.details {
		font-weight: 400;
	}

	input {
		height: 29px;
		width: 350px;
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

	.button-container {
		display: flex;
		align-items: right;
		justify-content: right;
		margin-top: 30px;
		gap: 10;
	}

	.edit-button {
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
</style>


<div class="max-w-full flex flex-col min-h-min bg-teal-400">
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
        <div class="top-container">
            <div class="h1-container"><h1>Profile Information</h1></div>

            <!-- for successful/error prompts -->
            <div class="prompt-container">
              {#if alertOn == true} 
                {#if successEdit == true}
                  <CustomerSuccess
                  message={message}
                  on:closeAlert={handleAlertClose}
                  />
                {/if}

                {#if successEdit == false}
                  <CustomerError
                  message={message}
                  on:closeAlert={handleAlertClose}
                  />
                {/if}
              {/if}
            </div>
        </div>
        <div class="info-grid">
						<div class="info-item">
							<p>First Name</p>
							{#if isEditing}
								<input class="form-input" type="text" id="firstName" bind:value={userdetails.firstName} />
							{:else}
								<p class="details">{userdetails.firstName}</p>
							{/if}
						</div>

						<div class="info-item">
							<p>Last Name</p>
							{#if isEditing}
								<input
									class="form-input"
									type="text"
									id="lastName"
									bind:value={userdetails.lastName}
								/>
							{:else}
								<p class="details">{userdetails.lastName}</p>
							{/if}
						</div>

						<div class="info-item">
							<p>Email Address</p>
							{#if isEditing}
								<input class="form-input" type="text" id="email" bind:value={userdetails.email} />
							{:else}
								<p class="details">{userdetails.email}</p>
							{/if}
						</div>

						<div class="info-item">
							<p>Contact</p>
							{#if isEditing}
								<input
									class="form-input"
									type="text"
									id="contactNumber"
									bind:value={userdetails.contactNumber}
								/>
							{:else}
								<p class="details">{userdetails.contactNumber}</p>
							{/if}
						</div>
					</div>
					<h1>Address</h1>
					<div class="info-grid">
						<div class="info-item">
							<p>Street</p>
							{#if isEditing}
								<input class="form-input" type="text" id="street" bind:value={userdetails.street} />
							{:else}
								<p class="details">{userdetails.street}</p>
							{/if}
						</div>

						<div class="info-item">
							<p>City, Province</p>
							{#if isEditing}
								<input
									class="form-input"
									type="text"
									id="cityProvince"
									bind:value={userdetails.cityProvince}
								/>
							{:else}
								<p class="details">{userdetails.cityProvince}</p>
							{/if}
						</div>

						<div class="info-item">
							<p>Building/Floor/Unit Number</p>
							{#if isEditing}
								<input
									class="form-input"
									type="text"
									id="buildingNumber"
									bind:value={userdetails.buildingNumber}
								/>
							{:else}
								<p class="details">{userdetails.buildingNumber}</p>
							{/if}
						</div>

						<div class="info-item">
							<p>Postal Code</p>
							{#if isEditing}
								<input
									class="form-input"
									type="text"
									id="postalCode"
									bind:value={userdetails.postalCode}
								/>
							{:else}
								<p class="details">{userdetails.postalCode}</p>
							{/if}
						</div>
					</div>
				</form>

				<div class="edit">
					{#if isEditing}
						<div class="button-container">
							<button class="cancel-button" on:click={handleCancel}>Cancel</button> &nbsp&nbsp
							<button class="edit-button" on:click={handleConfirm}>Confirm</button>
						</div>
					{:else}
						<div class="button-container">
							<button class="edit-button" on:click={handleEdit}>Edit Details</button>
						</div>
					{/if}
				</div>
				{#if editModalOn}
					<ConfirmationModal
						confirmationHeader=""
						confirmationDetails="Are you sure you want to make the changes?"
						cancelLabel="Cancel"
						confirmLabel="Confirm"
						on:confirm={handleModalConfirmEdit}
						on:cancel={handleModalCancelEdit}
					/>
				{/if}

				{#if cancelModalOn}
					<ConfirmationModal
						confirmationHeader="DISREGARD CHANGES?"
						confirmationDetails="The changes you’ve made will not be saved if you leave this page."
						cancelLabel="Stay on this page"
						confirmLabel="Leave this page"
						on:confirm={handleModalCancelCancel}
						on:cancel={handleModalCancelCancel}
					/>
				{/if}
			</div>
		</div>
	</div>
</div>

