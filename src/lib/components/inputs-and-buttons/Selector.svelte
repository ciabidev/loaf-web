<script lang="ts">
	import ChevronDownIcon from '@iconify-svelte/hugeicons/chevron-down';
	import { scale } from 'svelte/transition';
	import { tick } from 'svelte';

	interface SelectOption {
		value: string;
		text: string;
	}

	interface Props {
		options?: SelectOption[];
		title?: string;
		locked?: boolean;
		full?: boolean;
		selected?: string;
		onSelect?: (value: string) => void;
	}

	let {
		options = [],
		title = '',
		locked = false,
		full = true,
		selected = $bindable(''),
		onSelect
	}: Props = $props();

	let isOpen = $state(false);
	let opensUpward = $state(false);
	let selectorWrapper = $state<HTMLDivElement>();
	let optionsMenu = $state<HTMLUListElement>();

	async function toggleMenu() {
		if (locked) return;

		isOpen = !isOpen;

		if (isOpen) {
			await tick();
			updateMenuDirection();
		}
	}

	function updateMenuDirection() {
		if (!selectorWrapper || !optionsMenu) return;

		const wrapperRect = selectorWrapper.getBoundingClientRect();
		const gap = 6;
		const spaceBelow = window.innerHeight - wrapperRect.bottom - gap;
		const spaceAbove = wrapperRect.top - gap;

		opensUpward = spaceBelow < optionsMenu.offsetHeight && spaceAbove > spaceBelow;
	}

	function handleSelection(value: string) {
		selected = value;
		isOpen = false;
		if (onSelect) onSelect(value);
	}

	$effect(() => {
		if (!isOpen) return;

		const handleViewportChange = () => updateMenuDirection();
		window.addEventListener('resize', handleViewportChange);
		window.addEventListener('scroll', handleViewportChange, true);

		return () => {
			window.removeEventListener('resize', handleViewportChange);
			window.removeEventListener('scroll', handleViewportChange, true);
		};
	});

	let currentLabel = $derived(options.find((opt) => opt.value === selected)?.text || 'Select...');
</script>

<div bind:this={selectorWrapper} class="selector-wrapper" class:full>
	<button
		type="button"
		class="selector-button"
		class:locked
		disabled={locked}
		aria-haspopup="listbox"
		aria-expanded={isOpen}
		onclick={toggleMenu}
	>
		{#if title}
			<h4 class="selector-title">{title}</h4>
		{/if}
		<div class="value-wrapper">
			<span class="current-value">{currentLabel}</span>
			<span class="selector-chevron" class:open={isOpen}>
				<ChevronDownIcon aria-hidden="true" />
			</span>
		</div>
	</button>

	{#if isOpen}
		<ul
			bind:this={optionsMenu}
			class={opensUpward ? 'options-menu options-menu--open-up' : 'options-menu'}
			role="listbox"
			transition:scale={{ duration: 160, start: 0.96, opacity: 0 }}
		>
			{#each options as option}
				<li role="none">
					<button
						type="button"
						class="menu-item"
						role="option"
						aria-selected={selected === option.value}
						onclick={() => handleSelection(option.value)}
					>
						{option.text}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.selector-wrapper {
		position: relative;
		display: inline-flex;
		width: fit-content;
		max-width: 100%;
	}

	.selector-button,
	.options-menu {
		background: var(--button-default);
		border: var(--button-stroke) solid 0.0625rem;
		box-shadow: var(--shadow-main);
		border-radius: var(--radius-md);
		padding: var(--switcher-padding);
	}

	.selector-wrapper.full {
		width: 100%;
	}

	.selector-button {
		width: 100%;
		min-width: 12rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--switcher-padding) * 2) 16px;
		gap: calc(var(--switcher-padding) * 2);
		color: var(--text-color);
		text-align: start;
	}

	.selector-chevron {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		line-height: 0;
		transition: transform 0.2s ease;
	}

	.selector-chevron :global(svg) {
		display: block;
	}

	.selector-chevron.open {
		transform: rotate(180deg);
	}

	.selector-title,
	.current-value {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.selector-title {
		flex-shrink: 0;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-color);
	}

	.current-value {
		width: fit-content;
		max-width: 100%;
		padding: 0.25rem 0.5625rem;
		border: 0.0625rem solid var(--button-stroke);
		border-radius: calc(var(--radius-md) - var(--switcher-padding));
		background: var(--surface);
		font-size: 0.95rem;
		font-weight: 500;
	}

	.value-wrapper {
		display: flex;
		align-items: center;
		gap: calc(var(--switcher-padding) / 2);
		min-width: 0;
		justify-content: flex-end;
	}

	.selector-title + .value-wrapper {
		margin-left: calc(var(--padding) / 3);
	}

	.options-menu {
		position: absolute;
		top: calc(100% + 0.375rem);
		left: 0;
		width: 100%;
		max-height: 15.625rem;
		overflow-y: auto;
		list-style: none;
		margin: 0;
		z-index: 100;
		display: flex;
		transform-origin: top center;
		flex-direction: column;
		gap: calc(var(--switcher-padding) - 0.0938rem);
	}

	.options-menu--open-up {
		top: auto;
		bottom: calc(100% + 0.375rem);
		transform-origin: bottom center;
	}

	.menu-item {
		width: 100%;
		text-align: left;
		justify-content: flex-start;
		height: calc(2.5rem - var(--switcher-padding) * 2);
		border-radius: calc(var(--radius-md) - var(--switcher-padding));
		border: 0.0625rem solid transparent;
		box-shadow: none;
		color: var(--muted-text-color);
	}

	.menu-item:hover {
		color: var(--text-color);
	}
	.menu-item[aria-selected='true'] {
		background: var(--accent);
		color: var(--secondary-text-color);
		color: var(--text-color);
		pointer-events: none;
	}
</style>
