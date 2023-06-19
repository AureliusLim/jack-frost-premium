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

<TemplateModal width="w-full max-w-7xl" on:closeModal={close} bgColor="bg-white">
  <div slot="header">
		<h1>Login</h1>
		<hr />
	</div>
    <div slot="body">
      {#if loginFailed}
        <p>Login failed. Please check your email and password.</p>
      {/if}
      <form on:submit|preventDefault={handleSubmit}>
        <label>
          Email:
          <input type="email" bind:value={email} />
        </label>
        <label>
          Password:
          <input type="password" bind:value={password} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
 
</TemplateModal>
<style lang="postcss">
  input{
    border:1px solid black;
  }
  button{
    border:1px solid black;
    padding:5px;
  }
</style>