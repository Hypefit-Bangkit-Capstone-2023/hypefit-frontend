<script lang="ts">
	export let image_url: string;
	export let name: string;
	export let id: number;
</script>

<div
	class="rounded-lg relative w-full h-full group overflow-hidden"
	style="box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);"
>
	<img class="w-full h-full object-contain" src={image_url} alt={name} />

	<div
		class="opacity-0 group-hover:opacity-100 absolute inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center transition-all"
	>
		<a
			href={`/wardrobe/items/${id}`}
			class="flex items-center justify-center aspect-square w-16 rounded-full bg-white bg-opacity-75 text-sm"
		>
			Edit
		</a>
	</div>
</div>
