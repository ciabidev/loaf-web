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
		d="M14.996 17h2a5 5 0 0 0 0-10h-2m-6 10h-2a5 5 0 0 1 0-10h2m-.5 5h7"
	/>
</svg>
