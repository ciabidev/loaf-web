<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		id: string;
		hint: string;
		long: boolean;
		required: boolean;
		value: string;
		children: Snippet;
	}
	
	let { label, id, hint, long, required, value, children }: Props = $props();
</script>

<div class="field">
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	{#if required && !value.trim()}
		<div class="required-text">Required</div>
	{/if}
	{#if hint}
		<div class="hint">{hint}</div>
	{/if}
	<div class="input-wrapper" class:long>
		{@render children()}
	</div>
</div>

<style>
	.field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-weight: bold;
	}

	.hint {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-muted, #666);
	}

	.input-wrapper {
		width: 100%;
	}

	.input-wrapper.long {
		min-height: 100px;
	}

	.required-text {
		color: var(--error);
		font-size: 0.8rem;
		display: inline-block;
	}
</style>
