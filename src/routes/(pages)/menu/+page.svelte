<script lang="ts">
	import type { PageData } from './$types';
	import ProductList from '$lib/components/Product/Client/List.svelte';
	import ProductInfo from '$lib/components/Modal/ProductInfo.svelte';
	import type { Product } from '$lib/types/product';
	import type { Offering } from '$lib/types/offering';
	import Searchbar from '$lib/components/Inputs/Searchbar.svelte';
	let searchTerm = "";
	let searchResults = [];
	const showProductInfo = async (event) => {
		productInfoModal = true;
		let res = await fetch(`/api/products/${event.detail.productId}`);
		const { product: prodInfo } = await res.json();
		product = prodInfo as Product;
		res = await fetch(`/api/categories/${product?.category?.id}`);
		const { category: catInfo } = await res.json();
		offerings = catInfo.offerings as Offering[];
	};

	const closeProductInfo = () => {
		productInfoModal = false;
		product = {} as Product;
		pId = '';
	};
	const handleSearch = (event) =>{
		searchTerm = event.detail;
		searchResults = data.products.filter((product) =>
    	product.name.toLowerCase().includes(searchTerm.toLowerCase())
  	);
		console.log(searchResults)
	}

	let pId = '';
	let productInfoModal = false;
	let product: Product = {} as Product;
	let offerings: Offering[] = [] as Offering[];
	export let data: PageData;
	console.log(data)
</script>

<svelte:head>
	<title>Menu | Jack Frost Premium Ice Cream</title>
</svelte:head>
<div class="searchbar-container">
  <Searchbar fullList={data.products} on:search={handleSearch}></Searchbar>
</div>

{#if !searchTerm}
	<div class="product-list-container">
		{#if data.sections.length > 0}
			{#each data.sections as section}
				<h1 class="header">{section.name}</h1>
				<ProductList width="w-full md:max-w-[90%]" products={section.products} on:showItem={showProductInfo}/>
			{/each}
			<h1 class="header">Complete Ice Cream Collection</h1>
		{/if}
		<ProductList
			width="w-full md:max-w-[90%]"
			products={data.products}
			on:showItem={showProductInfo}
		/>
	</div>
{:else}
	{#if searchResults.length > 0}
		<div class="product-list-container">
			<ProductList
				width="w-full md:max-w-[90%]"
				products={searchResults}
				on:showItem={showProductInfo}
			/>
		</div>
		{:else}
		<p class="no-results">Product Not Found</p>
		{/if}
{/if}

{#if productInfoModal}
	<ProductInfo {product} {offerings} on:closeProductInfo={closeProductInfo} />
{/if}

<style lang="postcss">

	 .searchbar-container {
    margin-bottom: 20px;
    height: 60px; /* Adjust the height as needed */
  }
	.product-list-container {
		@apply w-full bg-white flex flex-col justify-center items-center;
	}

	.header {
    color: red;
    text-align: left;
    font-size: larger;
    font-weight: bold;
  }
	.no-results{
		text-align:center;
		color:red;
		font-size: larger;
    font-weight: bold;
	}
</style>