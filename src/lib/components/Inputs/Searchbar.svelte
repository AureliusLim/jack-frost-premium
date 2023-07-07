<script lang='ts'>
  import { debounce } from 'lodash';
  import { onMount, afterUpdate } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  let searchTerm = '';
  let fullName = [];
  let showSearchResults = false;
  export let searchResults = []; // need to import the whole product list
  export let fullList;


  const dispatch = createEventDispatcher();
  onMount(async()=>{
    console.log('Mounting search')
    for(let i = 0; i < fullList.length; i++){
      fullName[i] = fullList[i].name;
    }

  })
  const search = async () => {
    // Simulating asynchronous behavior with a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if(searchTerm){
      searchResults = fullName.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
    }
  };

  // Debounce the search function to reduce API calls
  const debouncedSearch = debounce(search, 300);

  // Handler for search input changes
  const handleSearchInput = (event) => {
    searchTerm = event.target.value;
    if (!searchTerm) {
      searchResults = []; // Reset search results when search term becomes empty
    }
    debouncedSearch();
  };

  const listenOnClick = () =>{
    showSearchResults = true;
  }

  const handleSearchClick = () => {
    dispatch('search', searchTerm); // Dispatch 'search' event with the search term
  };
  const handleResultClick = (result) =>{
    dispatch('search', result)
  }
  // Hide search results when clicking outside the search container
  const handleClickOutside = (event) => {
    const searchContainer = document.querySelector('.input-box');
    if (searchContainer && !searchContainer.contains(event.target)) {
      showSearchResults = false;
    }
  }
  
  // Listen for clicks on the document
  afterUpdate(() => {
    if (showSearchResults) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
  });
</script>

<div class='search-container'>
   <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span class="search-icon" on:click={handleSearchClick}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
    
  </span>

  <input class="input-box" type="text" placeholder="Search..." bind:value={searchTerm} on:input={handleSearchInput} on:click={listenOnClick}/>

  
</div>
{#if searchResults.length > 0 && showSearchResults}
  <div class="search-results">

      <ul>
        {#each searchResults as result}
        <li><button on:click={handleResultClick(result)}>{result}</button></li>
        {/each}
      </ul>
      

  </div>
{/if}

<style>
  .search-container {
    display: flex;
    align-items: center;
    width: 30%;
    margin-bottom: 10px;
  }
  .search-results {
    position: absolute;
    z-index: 1; 
    background-color: white;
    padding: 5px;
    margin-top: 5px;
    margin-left:25px;
    width: 30%; 
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
  }
  .search-results button {
    width: 100%; /* Occupy the entire width of the container */
    text-align: left; 
    padding: 0.5rem; 
  }

  input {
    flex-grow: 1;
    padding: 8px;
    font-size: 16px;
    border: 1px solid black;
    margin-left:10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin: 4px 0;
  }
  .search-icon{
    cursor: pointer;
  }
</style>
