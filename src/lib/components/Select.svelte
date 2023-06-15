<script lang="ts">
	interface IOption {
		value: string;
		label: string;
	}

	export let placeholder: string = 'Select an option';
	export let options: IOption[] = [];
	export let value: string;
</script>

<select
	class="border-2 focus:border-blue-3 py-[14px] px-3 rounded-xl custom-select-arrow {$$props.class} outline-none"
	bind:value
	on:change
>
	<option value="" disabled selected>{placeholder}</option>
	{#each options as option}
		<option value={option.value} selected={value === option.value}>{option.label}</option>
	{/each}
</select>
