<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import SectionEditor from '../Modal/SectionEditor.svelte';
  import DeleteIcon from '$lib/components/Buttons/Delete.svelte';
  import EditIcon from '$lib/components/Buttons/Edit.svelte';

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
    width: 125vh;
    border-collapse:separate;
    border-spacing:0 35px;
  }

  .section-table th {
    padding: 0.5rem;
    background: none;
    text-align: left;
    color: #352F75;
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  .section-table td {
    padding-left: 10px;
    text-align: left;
  }

  .section-table td:nth-child(1){
    width: 60%;
  }

  .section-table td:nth-child(2){
    width: 5%;
  }

  .section-table td:nth-child(3){
    width: 10%;
  }

  .section-table td:nth-child(4){
    width: 15%;
  }

  .section-table td:nth-child(5){
    width: 10%;
  }

  .section-table td:nth-child(1),
  .section-table td:nth-child(2){
    background: white;
    color: #383d55;
    font-weight: 600;
    font-size: large;
    box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.25), 0px 4px 0px 0px rgba(0, 0, 0, 0.25);
  }

  .section-table td:nth-child(2){
    justify-items: right;
    align-content: right;
  }
</style>


{#if editing}
  <SectionEditor on:close={(event)=>{editing = !editing; dispatch("close", event.detail)}}  sectionName={sectionToBeEdited}/>
{/if}  
<table class="section-table">
  <thead>
    <tr>
      <th>Section Name</th>
      <th></th>
      <th></th>
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
          <button on:click={handleEdit(section.name)}>      
            <EditIcon label='' iconSize = 'w-6 h-6'/>
          </button>
        </td>
        <td></td>
        <td>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" bind:checked={section.isActivated} on:change={() => toggleDisplay(section)}/>
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-sky-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-400"></div>
          </label>
        </td>
        <td>
          <button on:click={() => deleteSection(section.id)}>
            <DeleteIcon label='' iconSize = 'w-6 h-6'/>
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
