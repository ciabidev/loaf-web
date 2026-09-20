<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	let {
		children,
		full = false,
		description = ''
	}: { children?: Snippet; full?: boolean; description?: string } = $props();

	let switcherElement: HTMLDivElement;
	let highlightElement: HTMLDivElement;

	onMount(() => {
		let frame = 0;

		const updateHighlight = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const activeButton = switcherElement.querySelector('button.active');

				if (!activeButton) {
					highlightElement.hidden = true;
					return;
				}

				const switcherBounds = switcherElement.getBoundingClientRect();
				const buttonBounds = activeButton.getBoundingClientRect();

				highlightElement.hidden = false;
				highlightElement.style.width = `${buttonBounds.width}px`;
				highlightElement.style.height = `${buttonBounds.height}px`;
				highlightElement.style.transform = `translate(${buttonBounds.left - switcherBounds.left - switcherElement.clientLeft + switcherElement.scrollLeft}px, ${buttonBounds.top - switcherBounds.top - switcherElement.clientTop + switcherElement.scrollTop}px)`;
			});
		};

		const mutationObserver = new MutationObserver(updateHighlight);
		mutationObserver.observe(switcherElement, {
			attributes: true,
			attributeFilter: ['class'],
			childList: true,
			subtree: true
		});

		const resizeObserver = new ResizeObserver(updateHighlight);
		resizeObserver.observe(switcherElement);
		switcherElement.addEventListener('scroll', updateHighlight);
		updateHighlight();

		return () => {
			cancelAnimationFrame(frame);
			mutationObserver.disconnect();
			resizeObserver.disconnect();
			switcherElement.removeEventListener('scroll', updateHighlight);
		};
	});
</script>

<div class="switcher-parent">
	<div class="switcher" class:full bind:this={switcherElement}>
		<div class="highlight" bind:this={highlightElement} aria-hidden="true"></div>
		{#if children}
			{@render children()}
		{/if}
	</div>
	{#if description}
		<div class="subtext">{description}</div>
	{/if}
</div>

<style>
	.switcher-parent {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.switcher {
		position: relative;
		display: flex;
		width: auto;
		height: auto;
		flex-direction: row;
		flex-wrap: nowrap;
		scrollbar-width: none;
		overflow-x: scroll;
		max-width: fit-content;
		border-radius: var(--radius-lg);
	}

	.switcher.full {
		max-width: 100%;
	}

	.switcher :global(button) {
		white-space: nowrap;
	}

	.switcher {
		background: var(--button-default);
		border: var(--button-stroke) solid 0.0625rem;
		box-shadow: var(--shadow-main);
		padding: var(--switcher-padding);
		gap: calc(var(--switcher-padding) - 0.0938rem);
	}

	.switcher :global(button.active) {
		pointer-events: none;
		background-color: transparent;
		color: var(--text-on-accent);
		color: var(--on-accent, contrast-color(var(--accent)));
	}

	.switcher :global(button) {
		width: 100%;
		/* [base button height] - ([switcher padding] * [padding factor to accommodate for]) */
		height: calc(2.5rem - var(--switcher-padding) * 2);
		border-radius: var(--radius-lg);
		border: transparent; /* without this the border will flash black when :active */
		box-shadow: none;
		position: relative;
		z-index: 1;
		background-color: transparent;
		transition:
			filter 0.2s ease,
			border-color 0.2s ease;
	}

	.switcher :global(button.active:hover) {
		filter: none;
	}

	.switcher :global(button:not(.active):hover) {
		font-weight: 600;
	}

	.switcher :global(button:active:not(.active)) {
		border-color: var(--button-stroke);
	}

	.highlight {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
		border-radius: var(--radius-lg);
		background-color: var(--accent);
		pointer-events: none;
		transition:
			transform 0.25s cubic-bezier(0.33, 1, 0.68, 1),
			width 0.25s cubic-bezier(0.33, 1, 0.68, 1),
			height 0.25s cubic-bezier(0.33, 1, 0.68, 1);
	}
</style>
