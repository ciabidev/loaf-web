<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>
<div id="loaf-wrapper">
	<div id="loaf">
		{@render children()}
	</div>
</div>

<style>
	#loaf-wrapper {
		width: 100%;
		height: calc(100% - var(--navbar-height));
		overflow: hidden;
		background-color: var(--nav-bg);
		border-bottom-left-radius: calc(var(--radius-md) * 2);
		border-bottom-right-radius: calc(var(--radius-md) * 2);
	}

	#loaf {
		height: 100%;
		overflow-y: auto;
		background-color: var(--bg-color);
	}
</style>