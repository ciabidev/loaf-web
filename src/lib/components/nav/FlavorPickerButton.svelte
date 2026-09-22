<script lang="ts">
	import { flavorPickerVisible } from '../../state/flavor-picker-visibility.js';
	import IceCream from '../icons/ice-cream.svelte';
</script>

<button id="flavor-picker-button" onclick={() => ($flavorPickerVisible = !$flavorPickerVisible)}>
	<div class="icon-holder">
		<IceCream />
	</div>
</button>

<style>
	#flavor-picker-button {
		pointer-events: all;
		background: var(--loaf-surface);
		padding: 7px;
		border-radius: 30px;
		filter: drop-shadow(0 0 3px var(--loaf-button-stroke));

		transition: transform 0.2s;

		will-change: transform;
	}

	@media (hover: hover) {
		#flavor-picker-button:hover {
			transform: scale(1.1);
		}
	}
	#flavor-picker-button:active {
		transform: scale(0.9);
	}
	.icon-holder {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 25px;
		height: 25px;
		background: var(--loaf-surface-secondary);
		border-radius: 50%;
		pointer-events: all;
	}
</style>
