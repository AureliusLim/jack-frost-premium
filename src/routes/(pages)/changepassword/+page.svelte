<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import ConfirmationModal from '$lib/components/Modal/Confirmation.svelte';
	import CustomerSuccess from '$lib/components/Alert/CustomerSuccess.svelte';
  import CustomerError from '$lib/components/Alert/CustomerError.svelte';

  let pass = {};
  let isEditing = false;
  let modalOn = false;
  let alertOn = false;
  let status;
  let msg = "";
  
  onMount(async () => {
    console.log("MOUNTING");
    status = "";
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
    }

    try {
      const response = await fetch('api/edit-password',{
        method: 'POST',
        headers:{
          'Content-type':'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      let data = await response.json();
      status = data.success
      msg = data.message
      alertOn = true;
      console.log(data)

      // location.reload();
    } catch (error) {
     console.log(error)
    }
  };

  const handleModalCancel = () => {
    modalOn = false;
  };

  const handleAlertClose = () => {
    alertOn = false;
    console.log(alertOn)
  }

</script>

<style>
  .main-container {
    height: max-content;
    display: flex;
    gap: 40px;
    justify-content: center;
    padding: 40px;
    background: #CDD5EB;
  }

  .side-menu {
    width: 20%;
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
    width: 80%;
    height: max-content; /* Change height to max-content to adjust based on content size */
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

  .form-input{
    height: 29px;
    width: 350px;
    border-radius: 15px;
    background: #F1F1F1;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    text-indent: 15px;
    color: #383D55;
    font-weight: 500;
  }

  .form-input:focus {
    outline: 3px solid #CDD5EB;
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
  }

  .form-button {
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
          <div class="top-container">
            <div class="h1-container"><h1>Change Password</h1></div>

            <!-- for successful/error prompts -->
            <div class="prompt-container">
              {#if alertOn == true} 
                {#if status == true}
                  <CustomerSuccess
                  message={msg}
                  on:closeAlert={handleAlertClose}
                  />
                {/if}

                {#if status == false}
                  <CustomerError
                  message={msg}
                  on:closeAlert={handleAlertClose}
                  />
                {/if}
              {/if}
            </div>
          </div>

          <div class="info-grid">
            <div class="info-item">
              <p class="label">Old Password</p>
              <input class="form-input" type="password" id="oldpass" bind:value={pass.old} />
            </div>

            <div class="info-item">
              <!-- empty space -->
            </div>

            <div class="info-item">
              <p class="label">New Password</p>
              <input class="form-input" type="password" id="newpass" bind:value={pass.new}/>
            </div>
            <div class="info-item">
              <p class="label">Confirm New Password</p>
              <input class="form-input" type="password" id="confirmpass" bind:value={pass.confirm}/>
            </div>
          </div>

          
        </form>

        <div class="button-container">
          <button class="form-button" on:click={handleConfirm}>Change Password</button>
        </div>

        {#if modalOn}
          <ConfirmationModal
            confirmationHeader=""
            confirmationDetails="Are you sure you want to make the changes?"
            cancelLabel="Cancel"
            confirmLabel="Change Password"
            on:confirm={handleModalConfirm}
            on:cancel={handleModalCancel}
          />
        {/if}
        
      </div>
    </div>
  </div>
</div>