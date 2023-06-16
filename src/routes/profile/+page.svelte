<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import auth from '$lib/services/auth';
	import type { UserProfile } from '$lib/services/types';
	import userService from '$lib/services/user';
	import { isDataLoaded } from '$lib/stores/loading';

	let user: UserProfile | undefined;

	$isDataLoaded = false;
	userService
		.getProfile()
		.then((res) => {
			user = res;
		})
		.finally(() => {
			$isDataLoaded = true;
		});
</script>

<div class="px-4 mt-4 relative">
	<div class="w-24 aspect-square rounded-full overflow-hidden mx-auto mt-8">
		<img
			src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
			class="w-full h-full object-cover"
			alt=""
		/>
	</div>
	<p class="font-bold text-blue-3 text-center mt-3 mb-8">{user?.name}</p>

	<div class="grid grid-cols-2 max-w-[270px] w-full mx-auto">
		<div class="text-center">
			<p class="font-bold text-blue-3">{user?.liked_outfit_count}</p>
			<p class="text-sm font-medium text-gray-600">liked outfits</p>
		</div>
		<div class="text-center">
			<p class="font-bold text-blue-3">{user?.wardrobe_item_count}</p>
			<p class="text-sm font-medium text-gray-600">wardrobe items</p>
		</div>
	</div>
	<div class="logout-button">
		<Button type="danger" on:click={auth.logout}>Logout</Button>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}

	.logout-button {
		position: absolute;
		left: 0;
		right: 0;
		top: calc(100vh - 240px);
		margin: auto;
		width: 90%;
	}
</style>
