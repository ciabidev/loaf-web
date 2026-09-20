<!-- the basic page container used by most pages. Not all pages will have pading or be centered, which is why we cant just apply this to #loaf -->

<script lang="ts">
	import type { Snippet } from 'svelte';
	let {containerId, pageId, maxWidth, children}: { containerId: string; pageId: string; maxWidth: string; children: Snippet } = $props();
</script>

<div id={containerId} class="page-container">
	<main id={pageId} class="page-main" style="--max-width: {maxWidth}">
		{@render children()}
	</main>
</div>

<style>
	.page-container {
		width: 100%;
		display: flex;
		justify-content: center;
		min-height: 100%;
		overscroll-behavior: none;
		padding: var(--padding-md);
	}

	.page-main {
		width: var(--max-width);
		max-width: 100%; /* super responsive, on smaller devices the page naturally expands to fill the screen */
		gap: 1.25rem;
		display: flex;
		flex-direction: column;
	}

	@media only screen and (max-height: 25rem) {
		.page-container {
			justify-content: center;
			align-items: center;
			height: max-content;
		}
	}
</style>