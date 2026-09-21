<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	let { width = '1em', height = '1em', ...props }: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	{width}
	{height}
	fill="none"
	aria-hidden="true"
	focusable="false"
	{...props}
>
	<path
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="1.5"
		d="m17 17 4 4m-2-10a8 8 0 1 0-16 0a8 8 0 0 0 16 0"
	/>
</svg>
