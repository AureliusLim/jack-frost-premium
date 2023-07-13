<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import SectionEditor from '../Modal/SectionEditor.svelte';
  export let sections;
  let editing = false;
  let sectionToBeEdited;
  const dispatch = createEventDispatcher();
  const deleteSection = (ID)=>{
    dispatch('delete', ID)
  }
  // Clean up event listeners on component destruction
  onDestroy(() => {
    // Clean up any event listeners or subscriptions
  });

  const handleEdit = (name)=>{
    editing = !editing;
    sectionToBeEdited = name;
  }
  const toggleDisplay = async (obj)=>{
    const response = await fetch('/api/sections/toggleDisplay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ section: obj})
    });
    let d = await response.json()
    let successEdit = d.success;
    if(successEdit){
      console.log(d.updatedSection)
    }
    else{
      console.log("Updated Failed")
    }
  }
  

  console.log()
</script>

<style>
  .section-table {
    width: 80%;
    border-collapse: collapse;
  }

  .section-table th,
  .section-table td {
    padding: 0.5rem;
    text-align: center;
    border: 1px solid #ccc;
  }

  .section-table th {
    background-color: #f2f2f2;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 36px;
    height: 20px;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  .display-switch:checked + .slider {
    background-color: #4CAF50;
  }

  .display-switch:checked + .slider:before {
    transform: translateX(16px);
  }


  .delete-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #2196F3;
    color: white;
    font-size: 1rem;
    cursor: pointer;
  }
  .edit-icon{
    cursor:pointer;
  }
</style>
{#if editing}
  <SectionEditor on:close={()=>{editing = !editing}}  sectionName={sectionToBeEdited}/>
{/if}  
<table class="section-table">
  <thead>
    <tr>
      <th>Section Name</th>
      <th>Edit</th>
      <th>Display</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {#each sections as section}
      <tr>
        <td>{section.name}</td>
        <td>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <svg class="edit-icon" on:click={handleEdit(section.name)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
        </td>
        <td>
          <label class="switch">
            <input type="checkbox" bind:checked={section.isActivated} on:change={() => toggleDisplay(section)} class="display-switch" />
            <span class="slider"></span>
          </label>
        </td>
        <td>
          <button on:click={() => deleteSection(section.id)} class="delete-btn">Delete</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
