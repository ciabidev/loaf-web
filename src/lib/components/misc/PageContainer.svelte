<!-- the basic page container used by most pages. Not all pages will have pading or be centered, which is why we cant just apply this to #loaf -->

<script lang="ts">
	import type { Snippet } from 'svelte';
	let { pageId, maxWidth, children }: { pageId: string; maxWidth: string; children: Snippet } = $props();
</script>

<main id={pageId} class="page-container" style="--max-width: {maxWidth}">
	{@render children()}
</main>

<style>
	.page-container {
		width: min(calc(var(--max-width) + var(--loaf-padding-md) * 2), 100%);
		min-height: 100%;
		margin-inline: auto;
		padding: var(--loaf-padding-md);
		overscroll-behavior: none;
		display: flex;
		gap: 1.25rem;
		flex-direction: column;
	}

</style>
