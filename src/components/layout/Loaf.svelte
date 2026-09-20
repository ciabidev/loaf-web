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
		background-color: var(--surface);
		border-radius: 0;
		border-bottom-left-radius: calc(var(--radius-md) * 2);
		border-bottom-right-radius: calc(var(--radius-md) * 2);
	}

	:global(#basket:has(> .navbar[data-position='top']:not(.test))) #loaf-wrapper {
		margin-top: var(--navbar-height);
		border-radius: calc(var(--radius-md) * 2) calc(var(--radius-md) * 2) 0 0;
	}

	:global(#basket:has(> .navbar[data-position^='left']:not(.test))) #loaf-wrapper {
		width: calc(100% - var(--navbar-width) - var(--navbar-inner-padding) * 2);
		height: 100%;
		margin-left: calc(var(--navbar-width) + var(--navbar-inner-padding) * 2);
		border-radius: calc(var(--radius-md) * 2) 0 0 calc(var(--radius-md) * 2);
	}

	:global(#basket:has(> .navbar[data-position^='right']:not(.test))) #loaf-wrapper {
		width: calc(100% - var(--navbar-width) - var(--navbar-inner-padding) * 2);
		height: 100%;
		border-radius: 0 calc(var(--radius-md) * 2) calc(var(--radius-md) * 2) 0;
	}

	#loaf {
		height: 100%;
		overflow-y: auto;
		animation:
			loaf-enter-motion var(--loaf-enter-duration, 700ms)
				var(--loaf-enter-easing, var(--ease-fluid)),
			loaf-enter-reveal var(--loaf-enter-reveal-duration, 400ms)
				var(--loaf-enter-easing, var(--ease-fluid));
	}

	@keyframes loaf-enter-motion {
		from {
			transform: translate3d(0, var(--loaf-enter-distance, 1.25rem), 0);
		}

		to {
			transform: translate3d(0, 0, 0);
		}
	}

	@keyframes loaf-enter-reveal {
		from {
			opacity: 0.001;
			filter: blur(var(--loaf-enter-blur, 0.625rem));
		}

		to {
			opacity: 1;
			filter: blur(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		#loaf {
			animation: none;
		}
	}

	@media screen and (max-width: 600px) {
		:global(#basket:has(> .navbar[data-position$='-top']:not(.test))) #loaf-wrapper,
		:global(#basket:has(> .navbar[data-position$='-bottom']:not(.test))) #loaf-wrapper {
			width: 100%;
			height: calc(100% - var(--mobile-navbar-height));
			margin-left: 0;
		}

		:global(#basket:has(> .navbar[data-position$='-top']:not(.test))) #loaf-wrapper {
			margin-top: var(--mobile-navbar-height);
			border-radius: calc(var(--radius-md) * 2) calc(var(--radius-md) * 2) 0 0;
		}

		:global(#basket:has(> .navbar[data-position$='-bottom']:not(.test))) #loaf-wrapper {
			margin-top: 0;
			border-radius: 0 0 calc(var(--radius-md) * 2) calc(var(--radius-md) * 2);
		}
	}
</style>
