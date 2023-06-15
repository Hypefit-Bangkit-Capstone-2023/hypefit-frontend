<script>
	import HeartSolidIcon from '$lib/components/icons/HeartSolidIcon.svelte';
	import recommendationService from '$lib/services/recommendation';
	import HeartIcon from '../icons/HeartIcon.svelte';

	/** @type {number} */
	export let id;

	/** @type {string[]} */
	export let imageUrls;

	/** @type {boolean} */
	export let isLiked;

	let [topUrl, bottomUrl, shoeUrl] = imageUrls;

	async function likeUnlike() {
		if (!isLiked) {
			isLiked = true;
			try {
				await recommendationService.like(id);
			} catch (error) {
				isLiked = false;
				console.log(error);
				alert('failed to like outfit');
			}
		} else if (isLiked) {
			isLiked = false;
			try {
				await recommendationService.removeLike(id);
			} catch (error) {
				isLiked = true;
				console.log(error);
				alert('failed to like outfit');
			}
		}
	}
</script>

<div class="rounded-lg py-4 px-4 relative" style="box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);">
	<div class="absolute top-2 right-2">
		<button
			class="p-2 rounded-full"
			style="box-shadow: 0px 1.14286px 3.42857px rgba(0, 0, 0, 0.25);"
			on:click={likeUnlike}
		>
			{#if isLiked}
				<HeartSolidIcon height={16} />
			{:else}
				<HeartIcon height={16} />
			{/if}
		</button>
	</div>
	<div class="flex flex-col">
		<div class="flex flex-row">
			<div class="section-1">
				<img src={topUrl} alt="Top" />
			</div>
			<div class="section-1">
				<img src={bottomUrl} alt="Bottom" />
			</div>
		</div>
		<div class="section-2">
			<img src={shoeUrl} alt="Shoe" />
		</div>
	</div>
</div>

<style>
	.section-1 {
		@apply h-[160px] flex justify-center items-center w-1/2;
	}

	.section-1 img {
		@apply h-full;
	}

	.section-2 {
		@apply mt-4 h-[80px] flex justify-center items-center;
	}

	.section-2 img {
		@apply h-full;
	}
</style>
