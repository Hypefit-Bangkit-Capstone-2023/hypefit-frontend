<script lang="ts">
	import OutfitFeedCard from '$lib/components/card/OutfitFeedCard.svelte';
	import recommendationService from '$lib/services/recommendation';
	import type { RecommendationItem } from '$lib/services/types';
	import { isDataLoaded } from '$lib/stores/loading';
	import { onDestroy } from 'svelte';

	let items: RecommendationItem[] = [];

	let isWardrobeItemsNotFulfilled = false;
	let isTaskNotCreated = false;
	let isTaskPending = false;
	let isTaskStarted = false;
	let isRecommendationReady = false;

	$isDataLoaded = false;

	function load() {
		recommendationService
			.getRecommendation()
			.then(async (res) => {
				const {
					wardrobe_item_count,
					completed_task_count,
					// failed_task_count,
					pending_task_count,
					started_task_count
				} = res;

				items = res.items;

				isWardrobeItemsNotFulfilled =
					!items.length &&
					(!wardrobe_item_count.top || !wardrobe_item_count.bottom || !wardrobe_item_count.shoe);

				isTaskNotCreated = !items.length && !pending_task_count && !started_task_count;
				isTaskPending = !items.length && pending_task_count > 0;
				isTaskStarted = !items.length && started_task_count > 0;
				isRecommendationReady = items.length > 0 && completed_task_count > 0;
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				$isDataLoaded = true;
			});
	}

	load();

	const interval = setInterval(() => {
		if (isTaskPending || isTaskStarted) {
			load();
		} else if (isRecommendationReady) {
			clearInterval(interval);
		}
	}, 5000);

	onDestroy(() => {
		clearInterval(interval);
	});

	function requestRecommendation() {
		recommendationService
			.requestRecommendation()
			.then(() => {
				location.reload();
			})
			.catch((err) => {
				console.log(err);
				alert('Something went wrong. Please try again later.');
			});
	}
</script>

{#if $isDataLoaded}
	{#if isWardrobeItemsNotFulfilled}
		<div class="h-full flex justify-center items-center mx-auto text-center px-4">
			<div class=" text-md leading-6">
				<h1 class="text-blue-3 font-bold">Looks like you need to add more wardrobe items</h1>
				<h2 class="text-blue-2 font-medium">
					Please make sure at least one top, bottom, and shoe.
				</h2>
				<a href="/wardrobe/items/create">
					<button
						class="mt-2 uppercase text-xl text-blue-2 font-medium bg-blue-3 py-2 px-2 w-full rounded-md"
					>
						Add Item
					</button>
				</a>
			</div>
		</div>
	{/if}

	{#if isTaskNotCreated}
		<div class="h-full flex justify-center items-center mx-auto text-center px-4">
			<div class=" text-md leading-6">
				<h1 class="text-blue-3 font-bold">Done adding items to your wardrobe?</h1>
				<h2 class="text-blue-2 font-medium">Get your tailored recommendations now!</h2>
				<button
					class="mt-2 uppercase text-xl text-blue-2 font-medium bg-blue-3 py-2 px-2 w-full rounded-md"
					on:click={requestRecommendation}
				>
					Tap Here
				</button>
			</div>
		</div>
	{/if}

	{#if isTaskPending || isTaskStarted}
		<div class="h-full flex justify-center items-center mx-auto text-center px-4">
			<div class="font-bold text-blue-3 text-md leading-6">
				<h1>We've got your recommendation request!</h1>
				<h2 class="font-medium opacity-60">
					Sit tight while we generate tailored recommendations just for you.
				</h2>
			</div>
		</div>
	{/if}

	{#if isRecommendationReady}
		<div class="px-4 mt-4">
			<div class="text-blue-3">
				<h1 class="font-bold text-xl">Recommended for you</h1>
				<p class="font-medium text-sm opacity-60">
					Discover personalized recommendations tailored just for you, based on your unique
					preferences and interests
				</p>
			</div>

			<div class="grid mt-2 py-2 gap-4">
				{#each items as item (item.id)}
					<OutfitFeedCard id={item.id} imageUrls={item.image_urls} isLiked={item.is_liked} />
				{/each}
			</div>
		</div>
	{/if}
{/if}

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
