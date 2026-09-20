<script lang="ts">
	import type { CarouselItemType } from '../../types/carousel.js';

	let {
		item,
		isActive,
		onSelect
	}: { item: CarouselItemType; isActive: boolean; onSelect?: (item: CarouselItemType) => void } =
		$props();

	let thisItem: HTMLElement;

	const scrollToItem = (ele: HTMLElement) => {
		const carousel = ele.parentElement;

		if (!carousel || carousel.scrollWidth <= carousel.clientWidth) return;

		carousel.scrollTo({
			left: ele.offsetLeft - (carousel.clientWidth - ele.offsetWidth) / 2,
			behavior: 'smooth'
		});
	};

	$effect(() => {
		/* Keep the active item visible within the carousel. */
		if (isActive) {
			scrollToItem(thisItem);
		}
	});
</script>

<button
	class="carousel-item"
	class:active={isActive}
	bind:this={thisItem}
	onclick={() => onSelect?.(item)}
>
	<div class="title">{item.title}</div>
	<img src={item.image} alt={item.title} />
	{#if item.description}
		<div class="subtext">{item.description}</div>
	{/if}
</button>

<style>
	.carousel-item {
		display: flex;
		flex-direction: column;
		flex: 0 0 auto; /* don’t shrink the item completely */

		gap: calc(var(--padding) / 2);
		z-index: 10;
		background: none;
		max-width: 8.125rem;
		color: var(--text-color);
	}

	.carousel-item img {
		width: 100%;
		height: 100%;
		max-width: 8.125rem; /* force exact width */
		max-height: 8.125rem; /* force exact height */
		flex-shrink: 0;
		aspect-ratio: 1/1;
		object-fit: cover;
		border-radius: var(--radius-md);
	}
	.carousel-item.active {
		transform: scale(1.1);
		z-index: 20;
	}

	.carousel-item.active img {
		border: var(--button-stroke) solid 0.0625rem;
		box-shadow: var(--shadow-main);
	}
</style>
