<script>
	import OutfitFeedCard from '$lib/components/card/OutfitFeedCard.svelte';
	import recommendationService from '$lib/services/recommendation';
	import { isDataLoaded } from '$lib/stores/loading';

	/**@type {import('$lib/services/types').RecommendationItem[]}*/
	let items = [];

	let isWardrobeItemsNotFulfilled = false;
	let isTaskNotCreated = false;
	let isTaskPending = false;
	let isTaskStarted = false;
	let isRecommendationReady = false;

	$isDataLoaded = false;

	recommendationService.getRecommendation().then((res) => {
		$isDataLoaded = true;

		const {
			wardrobe_item_count,
			completed_task_count,
			failed_task_count,
			pending_task_count,
			started_task_count
		} = res;

		items = res.items;

		if (
			!items.length &&
			(!wardrobe_item_count.top || !wardrobe_item_count.bottom || !wardrobe_item_count.shoe)
		) {
			isWardrobeItemsNotFulfilled = true;
		} else if (
			!items.length &&
			!pending_task_count &&
			!started_task_count &&
			!completed_task_count &&
			!failed_task_count
		) {
			isTaskNotCreated = true;
		} else if (!items.length && pending_task_count) {
			isTaskPending = true;
		} else if (!items.length && started_task_count) {
			isTaskStarted = true;
		} else if (items.length && completed_task_count) {
			isRecommendationReady = true;
		}
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
