<script lang='ts'>
  import { createEventDispatcher } from 'svelte';
  import TemplateModal from '$lib/components/Modal/Template.svelte';
  import { fail, redirect } from '@sveltejs/kit';
 
  
  export let isOpen = false;
  export let onClose = () => {};

  let email = '';
  let password = '';
  
  let loginFailed = false;
  const dispatch = createEventDispatcher();
  
  
  
	const close = () => {
		dispatch('close');
	};
  const handleSubmit = async () => {
    try {
      // Perform login logic here
      const response = await fetch('api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      console.log(response)
      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Login successful
      
      console.log('Login successful');
     
      loginFailed = false;
      // Close the modal
      close()
    } catch (err) {
      console.log(err)
      loginFailed = true;
      return fail(400, { message: 'Could not login' });
    }
  };
</script>

<TemplateModal width="max-w-7xl" on:closeModal={close} bgColor="bg-white">
  <div slot="header">
		<h1>Login</h1>
	</div>
    <div slot="body">
      {#if loginFailed}
        <p>Login failed. Please check your email and password.</p>
      {/if}
      <form on:submit|preventDefault={handleSubmit}>
        <div class="form-container">
          <label>
            Email <br>
            <input type="email" bind:value={email} />
          </label>
          <label>
            Password <br>
            <input type="password" bind:value={password} />
          </label>
          <div class="button-container">
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
 
</TemplateModal>
<style lang="postcss">
  .form-container{
    @apply w-full flex flex-col gap-5;
  }

	h1 {
		@apply block font-IstokWeb text-navy-blue 
      font-bold text-5xl text-center pb-4;
	}
  
  p {
    margin-bottom: 25px;
  }

  label {
    color: #352F75;
    font-weight: 700;
  }

  input {
    height: 40px;
    width: 350px;
    border-radius: 15px;
    background: #F1F1F1;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .button-container {
    display: flex;
    align-items: right;
    justify-content: right;
    margin-top: 30px;
  }

  button {
    width: 150px;
    padding: 5px;
    border-radius: 20px;
    color: #FFFFFF;
    background: #F70B21;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
</style>