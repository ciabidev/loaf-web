<script lang="ts">
	import ExternaLLinkIcon from '../icons/external-link.svelte';
	import type { Snippet } from 'svelte';
	interface Props {
		url: string;
		title?: string;
		children: Snippet;
	}

	let { url, title = url, children }: Props = $props();
</script>

<a href={url} class="link" {title}>
	<ExternaLLinkIcon aria-hidden="true" class="link__icon" />{@render children()}
</a>

<style>
	.link {
		color: var(--loaf-accent-secondary);
	}

	:global(.link__icon) {
		display: inline-block;
		width: 1em;
		height: 1em;
		margin-inline-end: 0.3125em;
		vertical-align: -0.125em;
	}
</style>
