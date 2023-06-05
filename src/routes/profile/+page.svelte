<script>
	import Button from '$lib/components/Button.svelte';
	import auth from '$lib/services/auth';
</script>

<div class="px-4 mt-4">
	<h1 class="text-3xl font-bold underline text-center">Profile</h1>
	<Button type="danger" on:click={auth.logout}>Logout</Button>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
