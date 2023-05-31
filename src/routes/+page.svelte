<script>
	import OutfitFeedCard from '$lib/components/card/OutfitFeedCard.svelte';
</script>

<div class="px-4 mt-4">
	<div class="text-blue-3">
		<h1 class="font-bold text-xl">Recommended for you</h1>
		<p class="font-medium text-sm opacity-60">
			Discover personalized recommendations tailored just for you, based on your unique preferences
			and interests
		</p>
	</div>

	<div class="grid mt-3">
		<OutfitFeedCard />
		<OutfitFeedCard />
		<OutfitFeedCard />
		<OutfitFeedCard />
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
