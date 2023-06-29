<script lang="ts">
	import jfpLogo from '$lib/assets/logos/jack-frost-premium.png';
</script>

<svelte:head>
	<title>User Register | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="md:container mx-auto">
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
		<a href="/" class="flex items-center mb-6">
			<img class="w-100 h-20" src={jfpLogo} alt="JackFrostlogo" />
		</a>
		<div
			class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
		>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<form method="POST">
					<hgroup class="mb-5">
						<h2
							class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white"
						>
							Register
						</h2>
					</hgroup>

					<!-- First Name -->
					<div class="mb-5">
						<label
							for="firstName"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							First Name
						</label>
						<input
							type="text"
							placeholder="Enter your first name"
							class="input input-info input-bordered text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							id="firstName"
							name="firstName"
							required
						/>
					</div>

					<!-- Last Name -->
					<div class="mb-5">
						<label
							for="lastName"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Last Name
						</label>
						<input
							type="text"
							placeholder="Enter your last name"
							class="input input-info input-bordered text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							id="lastName"
							name="lastName"
							required
						/>
					</div>

					<!-- Email -->
					<div class="mb-5">
						<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Email
						</label>
						<input
							type="email"
							placeholder="Enter your email"
							class="input input-info input-bordered text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							id="email"
							name="email"
							required
						/>
					</div>

					<!-- Password -->
					<div class="mb-5">
						<label
							for="password"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Password
						</label>
						<input
							type="password"
							placeholder="Enter your password"
							class="input input-info input-bordered text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							id="password"
							name="password"
							required
						/>
					</div>

					<!-- Contact Number -->
					<div class="mb-5">
						<label
							for="contactNumber"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Contact Number
						</label>
						<input
							type="text"
							placeholder="Enter your contact number"
							class="input input-info input-bordered text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							id="contactNumber"
							name="contactNumber"
							required
						/>
					</div>

					<!-- Street -->
					<div class="mb-5">
						<label
							for="street"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Street
						</label>
						<input
							type="text"
							placeholder="Enter your street"
							class="input input-info input-bordered text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							id="street"
							name="street"
							required
						/>
					</div>

					<!-- City/Province -->
					<div class="mb-5">
						<label
							for="cityProvince"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							City/Province
						</label>
						<input
							type="text"
							placeholder="Enter your city/province"
							class="input input-info input-bordered text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							id="cityProvince"
							name="cityProvince"
							required
						/>
					</div>

					<!-- Building Number -->
					<div class="mb-5">
						<label
							for="buildingNumber"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Building Number
						</label>
						<input
							type="text"
							placeholder="Enter your building number"
							class="input input-info input-bordered text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							id="buildingNumber"
							name="buildingNumber"
							required
						/>
					</div>

					<!-- Postal Code -->
					<div class="mb-5">
						<label
							for="postalCode"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Postal Code
						</label>
						<input
							type="text"
							placeholder="Enter your postal code"
							class="input input-info input-bordered text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							id="postalCode"
							name="postalCode"
							required
						/>
					</div>

					<button
						class="w-full btn btn-button text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						type="submit"
					>
						Create an account
					</button>
				</form>
			</div>
		</div>
	</div>
</div>
