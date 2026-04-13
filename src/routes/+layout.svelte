<script lang="ts">
	import { browser } from '$app/environment';
	import '../app.css';
	import '../flavors.css';
	import Navbar from '$components/navbar/Navbar.svelte';
	import type { Snippet } from 'svelte';
	import DialogHolder from '$components/dialog/DialogHolder.svelte';
	let { children }: { children: Snippet } = $props();
	import NavTab from '$components/navbar/NavTab.svelte';
	import MacroIcon from '~icons/streamline-flex/toaster-remix';

	import FlavorPicker from '$components/navbar/FlavorPicker.svelte';
	import { registerFlavor } from '$lib/state/flavor-registry';

	registerFlavor({
		name: 'catppuccin-mocha-blue',
		description: 'Catppuccin Mocha with blue accents',
		iconPath: '/flavor_icons/catppuccin-mocha-blue.png',
		isDark: true,
		cssVariables: {
			'--bg-color': '#1e1e2e',
			'--text-color': '#cdd6f4',
			'--secondary-text-color': '#1e1e2e',
			'--main-color': '#89b4fa',
			'--sub-color': '#89b4fa',
			'--sub-alt-color': '#181825',
			'--color-success': '#a6e3a1',
			'--color-warning': '#f9e2af',
			'--color-error': '#f38ba8',
			'--nav-bg': '#11111b',
			'--nav-hover-bg': '#313244',
			'--nav-highlight': '#89b4fa',
			'--nav-active-highlight': '#11111b'
		}
	});

</script>

<svelte:head>
	<script>
	</script>
	<link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
	<link rel="shortcut icon" href="/favicon/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="ciabi" />
	<link rel="manifest" href="/favicon/site.webmanifest" />
</svelte:head>

<!-- acts as a "body" tag that we have more control over. Example: when a mobile user reaches end of scroll. then the page starts scrolling to make typing and scrolling easier -->
<div id="basket" class:loaded={browser}>
	<FlavorPicker />
	<DialogHolder />

	<div id="loaf">
		<!-- includes main content of the page only -->
		{@render children()}
	</div>

	<Navbar>
		<NavTab name = {'test'} Icon={MacroIcon} path={'/'} />
		<NavTab name = {'404'} Icon={MacroIcon} path={'/404'} />
	</Navbar>
</div>

<style>
	#loaf {
		/* content of the page */
		/*border: solid red .3125rem;
   */

		overflow-y: auto;
		width: 100%;
		background-color: var(--bg-color);
		border-bottom-left-radius: calc(var(--border-radius) * 2);
		border-bottom-right-radius: calc(var(--border-radius) * 2);
		height: calc(100% - var(--navbar-height));
	}

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
