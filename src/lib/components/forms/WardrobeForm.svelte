<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Select from '$lib/components/Select.svelte';
	import UploadIcon from '$lib/components/icons/UploadIcon.svelte';
	import uploadService from '$lib/services/upload';
	import wardrobeService from '$lib/services/wardrobe';

	const maxFileSize = '5MB';
	const maxFileSizeBytes = 5 * 1000 * 1000;

	let image: File | undefined;
	let name: string;
	let category_group_id: string;
	let category_id: string;

	let inputFileValue: FileList;
	let previewImage: string;
	let previewImageFileName: string;

	$: {
		const file = inputFileValue?.[0];
		if (file) {
			if (file.size > maxFileSizeBytes) {
				image = undefined;
				alert('Max file size exceeded');
			} else {
				const reader = new FileReader();
				reader.onload = function () {
					if (reader.result) {
						previewImage = reader.result.toString();
					}
				};
				reader.readAsDataURL(file);
				image = file;
				previewImageFileName = file.name;
			}
		}
	}

	let categoryGroups: { value: string; label: string }[] = [];

	wardrobeService.getItemCategoryGroups().then((res) => {
		categoryGroups = res.map((x) => ({ value: x.id.toString(), label: x.name }));
	});

	let categories: { value: string; label: string }[] = [];
	$: if (category_group_id) {
		wardrobeService.getItemCategoryGroupById(parseInt(category_group_id)).then((res) => {
			categories = res.members.map((x) => ({ value: x.id.toString(), label: x.name }));
			category_id = '';
		});
	}

	let isUploading = false;
	let isSubmitting = false;
	let isSuccess = false;

	async function handleCreate() {
		if (!image) {
			alert('Please choose an image');
			return;
		}

		if (!name) {
			alert('Please input an item name');
			return;
		}

		if (!category_group_id) {
			alert('Please select a group');
			return;
		}

		if (!category_id) {
			alert('Please select a category');
			return;
		}

		try {
			isUploading = true;
			const uploadImageRes = await uploadService.uploadImage(image);
			isUploading = false;

			isSubmitting = true;
			await wardrobeService.createItem({
				name,
				category_id: parseInt(category_id),
				image_key: uploadImageRes.key
			});
			isSubmitting = false;

			isSuccess = true;

			setTimeout(() => {
				goto('/wardrobe');
			}, 500);
		} catch (error) {
			console.log(error);
			isSuccess = false;
		} finally {
			isUploading = false;
			isSubmitting = false;
		}
	}
</script>

<form class="relative height">
	<div class="mb-3">
		<label for="image">
			<div class="h-[290px] rounded-xl border p-5 flex items-center justify-center cursor-pointer">
				{#if previewImage}
					<div class="h-[290px] p-2">
						<img
							src={previewImage}
							class="w-full h-full object-contain"
							alt={previewImageFileName}
						/>
					</div>
				{:else}
					<div class="text-center flex flex-col items-center">
						<UploadIcon width={44} height={44} />
						<p class="text-blue-3 font-bold mt-3">Choose file to upload</p>
						<p class="text-blue-3 font-medium text-sm">
							Maximum file size {maxFileSize.toUpperCase()}
						</p>
					</div>
				{/if}
			</div>
			<input id="image" type="file" name="image" class="hidden" bind:files={inputFileValue} />
		</label>
	</div>

	<div class="flex flex-col">
		<label for="name" class="text-blue-3 font-bold mb-2">Name</label>
		<input
			bind:value={name}
			name="name"
			placeholder="Input item name"
			class="input-text py-[14px]"
		/>
	</div>

	<div class="flex flex-col mt-5">
		<label for="category" class="text-blue-3 font-bold mb-2">Group</label>
		<Select
			bind:value={category_group_id}
			options={categoryGroups}
			class="!rounded-md py-4"
			placeholder="Select a group"
		/>
	</div>

	<div class="flex flex-col mt-5">
		<label for="category" class="text-blue-3 font-bold mb-2">Category</label>
		<Select
			bind:value={category_id}
			options={categories}
			class="!rounded-md py-4"
			placeholder={categories.length ? 'Select a category' : 'Select a group first'}
		/>
	</div>

	{#if isUploading || isSubmitting || isSuccess}
		<p class="mt-5 text-center text-blue-3 font-medium">
			Status:
			{#if isUploading}
				Uploading Image
			{:else if isSubmitting}
				Adding item
			{:else if isSuccess}
				Item added
			{:else if !isSuccess}
				Something went wrong
			{/if}
		</p>
	{/if}

	<div class="mt-4">
		<Button type="primary" on:click={handleCreate}>Save</Button>
	</div>
</form>

<style>
	.height {
		height: calc(100% - 40px);
	}
</style>
