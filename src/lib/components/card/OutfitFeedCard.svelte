<script>
	import HeartSolidIcon from '$lib/components/icons/HeartSolidIcon.svelte';
	import HeartIcon from '../icons/HeartIcon.svelte';

	let isLiked = false;
</script>

<div
	class="rounded-lg py-4 px-2 grid grid-flow-col relative"
	style="box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);"
>
	<div class="absolute top-2 right-2">
		<button
			class="p-2 rounded-full"
			style="box-shadow: 0px 1.14286px 3.42857px rgba(0, 0, 0, 0.25);"
			on:click={() => {
				isLiked = !isLiked;
			}}
		>
			{#if isLiked}
				<HeartSolidIcon height={16} />
			{:else}
				<HeartIcon height={16} />
			{/if}
		</button>
	</div>
	<img class="mx-auto" src="/images/top.png" alt="Top" />
	<img class="mx-auto" src="/images/bottom.png" alt="Bottom" />
</div>
