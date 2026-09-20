<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, }: { children: Snippet } = $props();
</script>

<div id="basket">
	{@render children()}
</div>

<style>
	#basket {
		height: 100%;
		width: 100%;
		overscroll-behavior-y: none;
		overflow-y: hidden;
		display: flex;
		flex-direction: column;
		background: var(--nav-bg);
	}
</style>
