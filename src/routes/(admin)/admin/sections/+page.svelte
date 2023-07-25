<script lang="ts">
  import { goto } from '$app/navigation';
  import {onMount, onDestroy } from 'svelte';
	import type { PageServerData } from './$types';
  import { createEventDispatcher } from 'svelte';
  import SectionTable from '$lib/components/Sections/SectionTable.svelte';
  import AddIcon from '$lib/components/Buttons/Add.svelte';

  let sections = []
  let name = "";
  // Sample section data
 onMount(()=>{
  console.log(data.sections)
  let c = 0;
  for(let counter = 0; counter < data.sections.length; counter++){
    if(data.sections[counter].name !== "Unassigned"){
      sections[c] = data.sections[counter];
      c += 1;
    }
  }
 })

 const createSection = async() =>{
    if(name){
      const response = await fetch('/api/sections/add',{
        method: 'POST',
        headers:{
          'Content-type': 'application/json',
        },
        body: JSON.stringify({name: name})
      })
      const data = await response.json();
      console.log("SECTION ADDED")
      console.log(data.section)
      if(data.success){
        sections[sections.length] = data.section
      }
    }
  }
  const handleDelete = async(event) =>{
    const response = await fetch('/api/sections/delete',{
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ID: event.detail})
    })
    const data = await response.json();
    console.log("SECTION Deleted")
    if(data.success){
      const res = await fetch('/api/sections');
      const newsection = await res.json();
      console.log(newsection)
      let c = 0;
      sections = [];
      for(let counter = 0; counter < newsection.sections.length; counter++){
        if(newsection.sections[counter].name !== "Unassigned"){
          sections[c] = newsection.sections[counter];
          c += 1;
        }
      }
    }
  
  }


  
  // Clean up event listeners on component destruction
  onDestroy(() => {
    // Clean up any event listeners or subscriptions
  });
  export let data: PageServerData;

  
  console.log(sections)
</script>

<svelte:head>
  <title>Sections | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="section-page-container">
  <div class="form-container">
    <!-- Input Form -->
    <div class="input-container">
      <input type="text" placeholder="Enter Section Name Here" class="section-input" bind:value={name} />
      <button class="add-section-btn" on:click={createSection}>
        <AddIcon label='Add Section' iconSize = 'w-11 h-11' labelStyle = 'pl-3 text-xl'/>
      </button>
    </div>
  </div>
  <!-- SectionTable-->
  <SectionTable sections={sections} on:delete={handleDelete}/>
</div>

<style lang="postcss">
  .section-page-container {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #CDD5EB;
    overflow: hidden;
    overflow-y: auto;
  }

  .form-container {
    margin-bottom: 2rem;
    margin-top: 60px;
  }

  .input-container {
    display: flex;
    align-items: center;
  }

  input{
    width: 40%;
  }

  .section-input {
    width: 25rem;
    height: 2.5rem;
    border-radius: 0.25rem;
    padding: 0.5rem;
    font-size: 1rem;
    background: #ECEBFA;
    color:#4a5568;
    font-weight: 400;
    @apply focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent
  }

  .add-section-btn {
    margin-left: 1rem;
    padding: 0rem 1rem;
    cursor: pointer;
  }
</style>
