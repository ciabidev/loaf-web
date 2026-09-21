<script>
	let isFocused = $state(false);
	let {
		placeholder,
		value = $bindable(''),
		description = null,
		Icon = null,
		width = '100%',
		min_width = '100%',
		id = null,
		type = 'text',
		long = false
	} = $props();
</script>

<div
	class="input-wrapper"
	class:focused={isFocused}
	style="--width: {width}; --min-width: {min_width}"
>
	{#if Icon}
		<div class="icon">
			<Icon />
		</div>
	{/if}
	{#if long}
		<textarea
			bind:value
			class="input"
			class:long
			oninput={() => (isFocused = true)}
			onfocus={() => (isFocused = true)}
			onblur={() => (isFocused = false)}
			{placeholder}
			{id}
			rows="4"
		></textarea>
	{:else}
		<input
			bind:value
			class="input"
			oninput={() => (isFocused = true)}
			onfocus={() => (isFocused = true)}
			onblur={() => (isFocused = false)}
			{placeholder}
			{id}
			{type}
		/>
	{/if}
</div>
{#if description}
	<div class="subtext">{description}</div>
{/if}

<style>
	.input-wrapper {
		border: var(--loaf-border-color) 0.125rem solid;
		border-radius: var(--loaf-radius-lg);
		width: var(--width);
		background: var(--loaf-surface-secondary);
		box-shadow: var(--loaf-shadow-main);
		min-width: var(--min-width);
		max-height: fit-content;
		display: flex;
		flex-direction: row;
		gap: 0.3125rem;
		padding: 0.8125rem 0.9375rem;
		align-items: center;
		transition:
			border-color 300ms cubic-bezier(1, 0, 0, 1),
			box-shadow 300ms cubic-bezier(1, 0, 0, 1);
	}

	.input-wrapper:has(textarea) {
		border-radius: var(--loaf-radius-md) !important;
	}

	.input-wrapper.focused {
		border: var(--loaf-accent) 2px solid;
		box-shadow: 0px 0px 0px 3px color-mix(in srgb, var(--loaf-accent) 30%, transparent);
	}

	.input {
		font-size: 0.875rem;
		width: 100%;
		border: none;
		overflow: auto;
		background: none;
		outline: none;
		resize: none;
		color: var(--loaf-text);
	}

	@media (pointer: none), (pointer: coarse) {
		.input {
			font-size: 1rem;
		}
		input:focus {
			font-size: 1rem;
		}
	}

	.icon {
		opacity: 0.5;
		transition: opacity 300ms cubic-bezier(1, 0, 0, 1);
	}

	.input-wrapper.focused > .icon {
		opacity: 1;
	}
</style>
