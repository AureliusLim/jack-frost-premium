<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
	import ConfirmationModal from '$lib/components/Modal/Confirmation.svelte';
  let userdetails = {};
  let isEditing = false;
  let modalOn = false;
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
        'Content-Type': 'application/json',
      },
      body: 'Logged out',
    });

    console.log('LOGGED OUT');
    goto('/');
  };

  const handleConfirm = ()=>{
    modalOn = true;
  }
  const handleEdit = ()=>{
    isEditing = true;
  }
  const handleCancel = ()=>{
    isEditing = false;
  }
  const handleModalConfirm = async ()=>{
    modalOn = false;
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
      console.log(data.message);
      if(data.success == false){
        alert('The email is already registered to another account.');
      }
      location.reload()
    }
    catch(error){
      
      console.log(error)
    }
   
  }
  const handleModalCancel = ()=>{
    modalOn = false;
  }
</script>

<style>
  .main-container {
    width: 1920px;
    height: 720px;
    display: flex;
    gap: 40px;
    justify-content: center;
    padding: 40px;
    background: #CDD5EB;
  }

  .side-menu {
    width: 250px;
    height: 423px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;

    background: #FFF;
    color: #383D55;
    font-family: Istok Web;
    font-weight: 700;
  }

  .info-container {
    width: 1620px;
    height: max;
    border: 1px solid white;
    padding: 10px;

    background: #FFF;
    color: #383D55;
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
  .form-input{
    border:1px solid black;
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
  
  .detail {
    font-weight: 400;
  }

 .button-container {
    display: flex;
    align-items: right;
    justify-content: right;
    margin-top: 30px;
  }

  .edit-button {
    width: 180px;
    padding: 5px;
    border-radius: 20px;
    background: #383D55;
    color: #FFF;
  }
</style>

<svelte:head>
  <title>My Orders | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class = "max-w-full flex flex-col min-h-min">
  <div class="main-container">
    <div class="side-menu">
      <button on:click={() => goto('/profile')}>Profile Information</button>
      <button on:click={()=> goto('/changepassword')}>Change Password</button>
      <button on:click={() => goto('/myorders')}>My Orders</button>
      <button on:click={handleLogout}>Sign Out</button>
    </div>

    <div class="info-container">
      <div class="profile-wrapper">
        <form id="userinfo">
        <h1>Profile Information</h1>
        <div class="info-grid">
          <div class="info-item">
            <p class="label">First Name</p>
            {#if isEditing}
              <input class="form-input" type="text" id="firstName" bind:value={userdetails.firstName} />
            {:else}
              <p>{userdetails.firstName}</p>
            {/if}
          </div>

          <div class="info-item">
            <p class="label">Last Name</p>
            {#if isEditing}
              <input class="form-input" type="text" id="lastName" bind:value={userdetails.lastName} />
            {:else}
              <p>{userdetails.lastName}</p>
            {/if}
          </div>

          <div class="info-item">
            <p class="label">Email Address</p>
            {#if isEditing}
              <input class="form-input" type="text" id="email" bind:value={userdetails.email} />
            {:else}
              <p>{userdetails.email}</p>
            {/if}
          </div>
       
          <div class="info-item">
            <p class="label">Contact</p>
            {#if isEditing}
              <input class="form-input" type="text" id="contactNumber" bind:value={userdetails.contactNumber} />
            {:else}
              <p>{userdetails.contactNumber}</p>
            {/if}
          </div>

        </div>
        <h1>Address</h1>
        <div class="info-grid">
            <div class="info-item">
              <p class="label">Street</p>
              {#if isEditing}
                <input class="form-input" type="text" id="street" bind:value={userdetails.street} />
              {:else}
                <p>{userdetails.street}</p>
              {/if}
            </div>

            <div class="info-item">
              <p class="label">City, Province</p>
              {#if isEditing}
                <input class="form-input" type="text" id="cityProvince" bind:value={userdetails.cityProvince} />
              {:else}
                <p>{userdetails.cityProvince}</p>
              {/if}
            </div>

            <div class="info-item">
              <p class="label">Building/Floor/Unit Number</p>
              {#if isEditing}
                <input class="form-input" type="text" id="buildingNumber" bind:value={userdetails.buildingNumber} />
              {:else}
                <p>{userdetails.buildingNumber}</p>
              {/if}
            </div>
            
            <div class="info-item">
              <p class="label">Postal Code</p>
              {#if isEditing}
                <input class="form-input" type="text" id="postalCode" bind:value={userdetails.postalCode} />
              {:else}
                <p>{userdetails.postalCode}</p>
              {/if}
            </div>

        </div>
      
        </form>

        <div class="edit">
          {#if isEditing}
            <button class="form-button" on:click={handleConfirm}>Confirm</button>
            <button class="form-button" on:click={handleCancel}>Cancel</button>
          {:else}
            <button class="form-button" on:click={handleEdit}>Edit Details</button>
          {/if}

        </div>
        {#if modalOn}
        <ConfirmationModal
            confirmationHeader=""
            confirmationDetails = "Are you sure you want to make the changes?"
            cancelLabel = "Cancel"
            confirmLabel = "Confirm"
            on:confirm={handleModalConfirm}
            on:cancel={handleModalCancel}
        />
        {/if}
       
      </div>
    </div>
  </div>
</div>


