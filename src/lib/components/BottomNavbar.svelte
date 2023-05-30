<script>
	import { page } from '$app/stores';
	import ClosetIcon from './icons/ClosetIcon.svelte';
	import HeartIcon from './icons/HeartIcon.svelte';
	import HomeIcon from './icons/HomeIcon.svelte';
	import UserCircleIcon from './icons/UserCircleIcon.svelte';

	let menuItems = [
		{
			name: 'Home',
			path: '/',
			icon: HomeIcon
		},
		{
			name: 'Wardrobe',
			path: '/wardrobe',
			icon: ClosetIcon
		},
		{
			name: 'Liked',
			path: '/liked',
			icon: HeartIcon
		},
		{
			name: 'Profile',
			path: '/profile',
			icon: UserCircleIcon
		}
	];
</script>

<div
	class="fixed bottom-0 w-full max-w-[388px]"
	style="box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);"
>
	<nav
		class="bg-white grid grid-flow-col justify-items-center text-blue-3 font-medium text-[11px] py-2"
	>
		{#each menuItems as menuItem}
			<div class="w-[70px]">
				{#if menuItem.path === $page.route.id}
					<div class="py-[6px] bg-blue-3 rounded">
						<a href={menuItem.path}>
							<svelte:component this={menuItem.icon} fill="white" />
							<h3 class="mx-1 text-center text-white">{menuItem.name}</h3>
						</a>
					</div>
				{:else}
					<div class="py-[6px]">
						<a href={menuItem.path}>
							<svelte:component this={menuItem.icon} />
							<h3 class="mx-1 text-center">{menuItem.name}</h3>
						</a>
					</div>
				{/if}
			</div>
		{/each}
	</nav>
</div>
