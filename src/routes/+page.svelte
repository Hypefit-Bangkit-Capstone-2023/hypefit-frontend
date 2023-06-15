<script>
	import OutfitFeedCard from '$lib/components/card/OutfitFeedCard.svelte';
	import recommendationService from '$lib/services/recommendation';
	import { isDataLoaded } from '$lib/stores/loading';

	/**@type {import('$lib/services/types').RecommendationItem[]}*/
	let items;

	$isDataLoaded = false;
	recommendationService.getRecommendation().then((res) => {
		$isDataLoaded = true;
		items = res.data.items;
	});
</script>

{#if $isDataLoaded}
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

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
