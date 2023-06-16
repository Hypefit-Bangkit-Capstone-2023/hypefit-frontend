<script lang="ts">
	import Select from '$lib/components/Select.svelte';
	import WardrobeCard from '$lib/components/card/WardrobeCard.svelte';
	import type { WardrobeItem } from '$lib/services/types';
	import wardrobeService from '$lib/services/wardrobe';
	import { isDataLoaded } from '$lib/stores/loading';

	let category_id: string = '0';

	let items: WardrobeItem[] = [];
	let categories: { value: string; label: string }[] = [{ value: '0', label: 'All' }];

	$isDataLoaded = false;

	Promise.all([wardrobeService.getAllItem(), wardrobeService.getItemCategories()])
		.then((res) => {
			items = res[0];

			res[1].forEach((x) => {
				categories.push({ value: x.id.toString(), label: x.name });
			});
			categories = categories;
		})
		.finally(() => {
			$isDataLoaded = true;
		});
</script>

<div class="px-4 mt-4">
	<h1 class="font-bold text-xl text-blue-3 mb-3">Your wardrobe</h1>

	<Select
		bind:value={category_id}
		class="!py-[4px] !pr-8"
		placeholder="Select category"
		options={categories}
		on:change={() => {
			$isDataLoaded = false;
			wardrobeService
				.getAllItem(category_id == '0' ? undefined : category_id)
				.then((res) => {
					items = res;
				})
				.finally(() => {
					$isDataLoaded = true;
				});
		}}
	/>

	<div class="grid grid-cols-2 gap-4 py-4">
		{#each items as item}
			<div class="aspect-square w-full">
				<WardrobeCard image_url={item.image_url} name={item.name} id={item.id} />
			</div>
		{/each}
	</div>

	<div class="plus-button">
		<a
			href="/wardrobe/items/create"
			class="flex items-center justify-center aspect-square w-[54px] bg-blue-3 rounded-full text-white text-4xl shadow-xl"
		>
			+
		</a>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}

	.plus-button {
		right: 20px;
		bottom: 90px;
		@apply fixed z-10;
	}
</style>
