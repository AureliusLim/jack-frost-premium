<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/Logo.svelte';
	import AlertSuccess from '$lib/components/Alert/Success.svelte';
	import AlertLoading from '$lib/components/Alert/Loading.svelte';
	import AlertError from '$lib/components/Alert/Error.svelte';

	export let form: ActionData;

	let isAuthenticating = false;
	let isSuccess = false;
	let isAuthError = false;
	let isPasswordError = false;
	let isConfirmError = false;

	const removePasswordError = () => {
		if (isAuthError) {
			isAuthError = false;
		}
		if (isPasswordError) {
			isPasswordError = false;
		}
	};

	const removeConfirmError = () => {
		if (isAuthError) {
			isAuthError = false;
		}
		if (isConfirmError) {
			isConfirmError = false;
		}
	};

	const submitUpdate: SubmitFunction = ({ form }) => {
		// Validation in server-side
		isAuthenticating = true;
		return async ({ result, update }) => {
			form.reset(); // Force reset form
			isAuthenticating = false;
			switch (result.type) {
				case 'redirect':
					isSuccess = true;
					// Reset form
					form.reset();
					setTimeout(() => {
						goto('/admin/login');
					}, 2000);
					break;
				case 'failure':
					// Update form message
					isAuthError = true;
					isPasswordError = true;
					isConfirmError = true;
					break;
			}
			await update();
		};
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
  <title>Change Password | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="container">
  <div class="content-wrapper">
    <div class="left-box">
      <button on:click={()=> goto('/profile')}>Profile Information</button>
      <button on:click={()=> goto('/changepassword')}>Change Password</button>
      <button on:click={() => goto('/myorders')}>My Orders</button>
      <button on:click={(handleLogout)} >Sign Out</button>
    </div>

    <div class="right-box">
      <div class="profile-wrapper">
        <form method = "POST">
          <h1>Change Password</h1>

        {#if form?.message && isAuthError}
          <AlertError padding="pb-4 font-semibold" message={form?.message} />
        {:else if isAuthenticating}
          <AlertLoading padding="pb-4 font-semibold" message="Validating..." />
        {:else if isSuccess}
          <AlertSuccess padding="pb-4 font-semibold" message="Password successfully updated" />
        {/if}
          
          <div class="info-grid">
            <div class="info-item">				
              <label for="old_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Old Password
              <input
                type="password"
                placeholder="Enter your old password"
                class="input input-info input-bordered text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="old_password"
                name="old_password"
                value={undefined ?? ''}
                on:keypress={removePasswordError}
                disabled={isAuthenticating || isSuccess}
                required
              />
            </label>
            </div>
          </div>

          <div class="info-grid">
            <div class="info-item">				
              <label for="new_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                New Password
              <input
                type="password"
                placeholder="Enter your new password"
                class="input input-info input-bordered text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="new_password"
                name="new_password"
                value={undefined ?? ''}
                on:keypress={removePasswordError}
                disabled={isAuthenticating || isSuccess}
                required
              />
              </label>
            </div>
          </div>

          <div class="info-grid">
            <div class="info-item">				
              <label for="confirm_newpassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm New Password
                <input
                  type="password"
                  placeholder="Confirm your new password"
                  class="input input-info input-bordered text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="confirm_newpassword"
                  name="confirm_newpassword"
                  value={undefined ?? ''}
                  on:keypress={removePasswordError}
                  disabled={isAuthenticating || isSuccess}
                  required
                />
              </label>
            </div>
          </div>

          <button
          class="btn btn-button text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="submit" 
          disabled={isAuthenticating || isSuccess}>
          Change password
          </button>
          </form>
        </div>
      </div>     
    </div>
  </div>


 
