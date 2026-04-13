<script lang="ts">		
	import PopoverContainer from '$components/misc/PopoverContainer.svelte';
	import FlavorPickerButton from '$components/navbar/FlavorPickerButton.svelte';
	import { flavorPickerVisible } from '$lib/state/flavor-picker-visibility';
	import CarouselContainer from '$components/inputs-and-buttons/CarouselContainer.svelte';
	import { flavors } from '$lib/state/flavor-registry';
	import { flavor } from '$lib/state/flavors';	
	const flavor_items = Array.from(flavors, ([name, definition]) => ({
		title: name,
		description: definition.description,
		image: definition.iconPath
	}));

</script>


<div id="flavor-picker">
	<FlavorPickerButton />
		<PopoverContainer
			expanded={$flavorPickerVisible}
			id="flavor-picker"
			title="flavors"
			description="pick your favorite"
		>
			<CarouselContainer
				onSelect={(item) => {
					flavor.set(item.title);
				}}
				id="flavor-picker-carousel"
				items={flavor_items}
				defaultSelected={flavor_items.findIndex((item) => item.title ===  $flavor)}
			></CarouselContainer>
		</PopoverContainer>
</div>

<style>
	#flavor-picker {
		--holder-padding: 12px;
		position: absolute;
		right: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: flex-start;
		gap: 5px;
		z-index: 10;
		pointer-events: none;
		padding: var(--holder-padding);
		width: 100%;
        height: 100%;
	}
</style>
