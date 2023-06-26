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

<svelte:head>
  <title>My Orders | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class = "max-w-full flex flex-col min-h-min">
  <div class="main-container">
    <div class="side-menu">
      <button on:click={() => goto('/profile')}>Profile Information</button>
      <button>Change Password</button>
      <button on:click={() => goto('/myorders')}>My Orders</button>
      <button on:click={handleLogout}>Sign Out</button>
    </div>

    <div class="info-container">
      <div class="profile-wrapper">
        <h1>Profile Information</h1>

        <div class="info-grid">
          <div class="info-item">
            <p>First Name</p>
            <p class="detail">{userdetails.firstName}</p>
          </div>

          <div class="info-item">
            <p>Last Name</p>
            <p class="detail">{userdetails.lastName}</p>
          </div>

          <div class="info-item">
            <p>Email Address</p>
            <p class="detail">{userdetails.email}</p>
          </div>

          <div class="info-item">
            <p>Contact</p>
            <p class="detail">{userdetails.contactNumber}</p>
          </div>
          
        </div>

        <h1>Address</h1>

        <div class="info-grid">
          <div class="info-item">
            <p>Street</p>
            <p class="detail">{userdetails.street}</p>
          </div>

          <div class="info-item">
            <p>City, Province</p>
            <p class="detail">{userdetails.cityProvince}</p>
          </div>
        
          <div class="info-item">
            <p>Building/Floor/Unit Number</p>
            <p class="detail">{userdetails.buildingNumber}</p>
          </div>

          <div class="info-item">
            <p>Postal Code</p>
            <p class="detail">{userdetails.postalCode}</p>
          </div>
        </div>
        
        <div class="button-container">
          <button class="edit-button">Edit Details</button>
        </div>
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