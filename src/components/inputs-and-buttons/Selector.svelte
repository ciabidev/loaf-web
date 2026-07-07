<script lang="ts">
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

	function toggleMenu() {
		if (locked) return;
		isOpen = !isOpen;
	}

	function handleSelection(value: string) {
		selected = value;
		isOpen = false;
		if (onSelect) onSelect(value);
	}

	let currentLabel = $derived(options.find((opt) => opt.value === selected)?.text || 'Select...');
</script>

<div class="selector-wrapper" class:full>
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
        </div>
	</button>

	{#if isOpen}
		<ul class="options-menu" role="listbox">
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
		border-radius: var(--border-radius);
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

	.selector-button:hover {
		filter: none;
	}

	.selector-button:active {
		filter: var(--button-press-filter);
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
		border-radius: calc(var(--border-radius) - var(--switcher-padding));
		background: var(--bg-color);
		font-size: 0.95rem;
		font-weight: 500;
	}

	.selector-title + .current-value {
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
		flex-direction: column;
		gap: calc(var(--switcher-padding) - 0.0938rem);
	}

	.menu-item {
		width: 100%;
		text-align: left;
		justify-content: flex-start;
		height: calc(2.5rem - var(--switcher-padding) * 2);
		border-radius: calc(var(--border-radius) - var(--switcher-padding));
		border: 0.0625rem solid transparent;
		box-shadow: none;
		background: transparent;
	}

	.menu-item:hover {
		filter: var(--button-hover-filter);
	}

	.menu-item[aria-selected='true'] {
		background: var(--main-color);
		color: var(--secondary-text-color);
		pointer-events: none;
	}

	.arrow-icon {
		flex-shrink: 0;
		font-size: 0.625rem;
		transition: transform 0.2s;
	}

	.arrow-icon.open {
		transform: rotate(180deg);
	}
</style>
