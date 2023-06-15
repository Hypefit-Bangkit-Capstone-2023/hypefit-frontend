<script>
	export let type = 'primary';

	/**
	 * @param {string} type
	 */
	function getAttributeByType(type) {
		const _default = {
			class: 'text-blue-4',
			style: 'box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);'
		};

		if (type == 'primary') {
			return _default;
		}

		if (type == 'danger') {
			return {
				class: 'text-[#EC0707]',
				style: 'box-shadow: 0px 0px 4px rgba(234, 0, 0, 0.25);'
			};
		}

		return _default;
	}

	const attributeByType = getAttributeByType(type);
</script>

<button
	class="rounded-md py-3 w-full mt-2 font-medium {attributeByType.class}"
	style={attributeByType.style}
	type="button"
	on:click
>
	<slot />
</button>
