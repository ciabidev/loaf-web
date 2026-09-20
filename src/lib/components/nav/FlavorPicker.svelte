<script lang="ts">		
	import PopoverContainer from '../misc/PopoverContainer.svelte';
	import FlavorPickerButton from './FlavorPickerButton.svelte';
	import { flavorPickerVisible } from '../../state/flavor-picker-visibility.js';
	import CarouselContainer from '../inputs-and-buttons/CarouselContainer.svelte';
	import { flavors } from '../../state/flavor-registry.js';
	import { flavor } from '../../state/flavors.js';	
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
