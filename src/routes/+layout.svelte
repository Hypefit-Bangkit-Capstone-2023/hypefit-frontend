<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import BottomNavbar from '$lib/components/BottomNavbar.svelte';
	import '../app.css';
	import '$lib/firebase';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { browser } from '$app/environment';

	if (browser) {
		onAuthStateChanged(getAuth(), (user) => {
			if (!user) {
				goto('/login');
			} else if ($page.route.id == '/login') {
				goto('/');
			}
		});
	}
</script>

<div class="mx-auto min-h-screen max-w-[390px] bg-white border border-x-black">
	{#if $page.route.id !== '/login'}
		<div class="px-5 py-4" style="box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);">
			<h1 class="font-bold text-xl text-blue-3">Hypefit</h1>
		</div>
	{/if}

	<slot />

	{#if $page.route.id !== '/login'}
		<BottomNavbar />
	{/if}
</div>
