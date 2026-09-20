<script lang="ts">		
	import Popover from '../misc/Popover.svelte';
	import FlavorPickerButton from './FlavorPickerButton.svelte';
	import { flavorPickerVisible } from '../../state/flavor-picker-visibility.js';
	import Carousel from '../inputs-and-buttons/Carousel.svelte';
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
		<Popover
			expanded={$flavorPickerVisible}
			id="flavor-picker"
			title="flavors"
			description="pick your favorite"
		>
			<Carousel
				onSelect={(item) => {
					flavor.set(item.title);
				}}
				id="flavor-picker-carousel"
				items={flavor_items}
				defaultSelected={flavor_items.findIndex((item) => item.title ===  $flavor)}
			></Carousel>
		</Popover>
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
