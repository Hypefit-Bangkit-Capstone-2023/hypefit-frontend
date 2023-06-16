<script lang="ts">
	import OutfitFeedCard from '$lib/components/card/OutfitFeedCard.svelte';
	import recommendationService from '$lib/services/recommendation';
	import type { RecommendationItem } from '$lib/services/types';
	import { isDataLoaded } from '$lib/stores/loading';

	let items: RecommendationItem[] = [];

	$isDataLoaded = false;
	recommendationService
		.getLikes()
		.then((res) => {
			console.log(res);
			items = res;
		})
		.finally(() => {
			$isDataLoaded = true;
		});
</script>

{#if $isDataLoaded}
	<div class="px-4 mt-4">
		<div class="text-blue-3">
			<h1 class="font-bold text-xl">Liked Outfits</h1>
			<p class="font-medium text-sm opacity-60">
				Liked outfits are a collection of carefully curated ensembles that you think suit your style
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
