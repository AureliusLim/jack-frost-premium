<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  let userdetails = {};
  onMount(async () => {
    console.log("MOUNTING")
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
        'Content-Type': 'application/json',
      },
      body: 'Logged out',
    });

    console.log('LOGGED OUT');
    goto('/');
  };
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .content-wrapper {
    flex-grow: 1;
    min-height: 200px;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .left-box {
    width: 25%;
    border: 1px solid black;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .right-box {
    margin: 0px 0px 0px 10px;
    flex-grow: 1;
    border: 1px solid black;
    height: 500px;
    padding: 10px;
  }

  .profile-wrapper {
    margin: 20px;
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
  }

  .label {
    font-weight: bold;
  }

  .info-grid {
    display: flex;
    flex-wrap: wrap;
    margin: 15px;
  }

  .info-item {
    flex-basis: 50%;
    padding: 5px;
    
  }
</style>

<svelte:head>
  <title>My Orders | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="container">
  <div class="content-wrapper">
    <div class="left-box">
      <button on:click={() => goto('/profile')}>Profile Information</button>
      <button on:click={()=> goto('/changepassword')}>Change Password</button>
      <button on:click={() => goto('/myorders')}>My Orders</button>
      <button on:click={handleLogout}>Sign Out</button>
    </div>

    <div class="right-box">
      <div class="profile-wrapper">
        <h1>Profile Information</h1>

        <div class="info-grid">
          <div class="info-item">
            <p class="label">First Name</p>
            <p>{userdetails.firstName}</p>
          </div>

          <div class="info-item">
            <p class="label">Last Name</p>
            <p>{userdetails.lastName}</p>
          </div>

          <div class="info-item">
            <p class="label">Email Address</p>
            <p>{userdetails.email}</p>
          </div>

          <div class="info-item">
            <p class="label">Contact</p>
            <p>{userdetails.contactNumber}</p>
          </div>
          
        </div>

        <h1>Address</h1>

        <div class="info-grid">
          <div class="info-item">
            <p class="label">Street</p>
            <p>{userdetails.street}</p>
          </div>

          <div class="info-item">
            <p class="label">City, Province</p>
            <p>{userdetails.cityProvince}</p>
          </div>
        

          <div class="info-item">
            <p class="label">Building/Floor/Unit Number</p>
            <p>{userdetails.buildingNumber}</p>
          </div>

          <div class="info-item">
            <p class="label">Postal Code</p>
            <p>{userdetails.postalCode}</p>
          </div>
          

        </div>
      </div>
    </div>
  </div>
</div>
