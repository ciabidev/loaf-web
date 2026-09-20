<script lang="ts">
	import type { Snippet } from 'svelte';
	import URLButton from '../inputs-and-buttons/URLButton.svelte';

	type CardVariant = 'flat' | 'bordered' | 'elevated' | 'ghost';

	interface Props {
		variant?: CardVariant;
		onclick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;
		children?: Snippet;
		url?: string;
		urlshort?: string;
		name?: string;
		description?: string;
		img?: string;
		banner?: string;
		tiny?: string;
		pad?: boolean;
	}

	let {
		variant = 'flat',
		pad = true,
		onclick,
		children,
		url,
		urlshort,
		name,
		description,
		img,
		banner,
		tiny
	}: Props = $props();
</script>

{#snippet cardContents()}
	{#if banner}
		<div class="banner-container" style:background-image={`url(${banner})`}></div>
	{/if}

	<div class="card-content" class:pad>
		{#if url && urlshort && name}
			<URLButton {url} {urlshort} {name} {img} />
		{/if}

		{#if name || tiny || description}
			<div class="card-text">
				{#if name}<h2>{name}</h2>{/if}
				{#if tiny}<div class="subtext tiny">{tiny}</div>{/if}
				{#if description}<div class="card-description">{description}</div>{/if}
			</div>
		{/if}

		{#if children}
			{@render children()}
		{/if}
	</div>
{/snippet}

{#if onclick}
	<button type="button" class="card {variant} interactive" aria-label={name} {onclick}>
		{@render cardContents()}
	</button>
{:else if url}
	<a class="card {variant} interactive" href={url} aria-label={name}>
		{@render cardContents()}
	</a>
{:else}
	<div class="card {variant}">
		{@render cardContents()}
	</div>
{/if}

<style>
	.card {
		display: block;
		width: 100%;
		overflow: hidden;
		border-radius: var(--radius-lg);
		color: var(--text);
		font: inherit;
		text-align: left;
		padding: 0;
		transition:
			transform 0.2s ease,
			filter 0.2s ease;
	}

	a.card {
		text-decoration: none;
	}

	.card.flat {
		background: var(--card);
		border: none;
		box-shadow: none;
	}

	.card.bordered {
		background: var(--card);
		border: 0.1875rem solid var(--card-stroke);
	}

	.card.elevated {
		background: var(--card);
		border: 0.0625rem solid var(--card-stroke);
		box-shadow: var(--card-box-shadow);
	}

	.card.ghost {
		background: transparent;
		border: 0.125rem dashed var(--card-stroke);
	}

	.card.interactive {
		cursor: pointer;
	}

	.card.interactive:hover {
		filter: var(--button-hover-filter);
	}

	.card-content {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.card-content.pad {
		padding:  0.75rem 1rem;
	}
	.card-text {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.card-description {
		font-size: 0.9375rem;
	}

	.tiny {
		font-size: 0.75rem;
	}

	.banner-container {
		width: 100%;
		height: 9.375rem;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
