<script lang="ts">
	import Select from '$lib/components/Select.svelte';
	import WardrobeCard from '$lib/components/card/WardrobeCard.svelte';
	import type { WardrobeItem } from '$lib/services/types';
	import wardrobeService from '$lib/services/wardrobe';
	import { isDataLoaded } from '$lib/stores/loading';

	let items: WardrobeItem[] = [];

	$isDataLoaded = false;

	wardrobeService.getAllItem().then((res) => {
		$isDataLoaded = true;
		items = res.data;
	});
</script>

<div class="px-4 mt-4">
	<h1 class="font-bold text-xl text-blue-3 mb-3">Your wardrobe</h1>

	<Select placeholder="All" options={[{ label: 'Option 1', value: 'option-1' }]} />

	<div class="grid grid-cols-2 gap-4 py-4">
		{#each items as item}
			<div class="aspect-square w-full">
				<WardrobeCard image_url={item.image_url} name={item.name} id={item.id} />
			</div>
		{/each}
	</div>

	<div class="fixed right-5 bottom-24 max-w-[450px] z-10">
		<a
			href="/wardrobe/items/create"
			class="flex items-center justify-center aspect-square w-16 bg-blue-3 rounded-full text-white text-4xl shadow-xl"
		>
			+
		</a>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
