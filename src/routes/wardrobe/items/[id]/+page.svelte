<script lang="ts">
	import { page } from '$app/stores';
	import WardrobeForm from '$lib/components/forms/WardrobeForm.svelte';
	import wardrobeService from '$lib/services/wardrobe';
	import { isDataLoaded } from '$lib/stores/loading';
	import type { WardrobeItem } from '$lib/services/types';

	let item: WardrobeItem | undefined;

	$isDataLoaded = false;
	wardrobeService
		.getItemById($page.params.id)
		.then((res) => {
			item = res;
		})
		.finally(() => {
			$isDataLoaded = true;
		});
</script>

<div class="px-4 mt-4 pb-4">
	<h1 class="font-bold text-xl text-blue-3 mb-3">Edit Item</h1>

	{#if item}
		<WardrobeForm
			item_id={item.id.toString()}
			category_group_id={item.category_group_id.toString()}
			category_id={item.category_id.toString()}
			name={item.name}
			image_url={item.image_url}
		/>
	{/if}
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
