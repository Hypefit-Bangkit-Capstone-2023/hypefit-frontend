<script>
	import WardrobeForm from '$lib/components/forms/WardrobeForm.svelte';
</script>

<div class="px-4 pt-4 h-full">
	<h1 class="font-bold text-xl text-blue-3 mb-3">Add Item</h1>

	<WardrobeForm />
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
