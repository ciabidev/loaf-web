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
	import { registerFlavor, registerFlavors } from '$lib/state/flavor-registry';

	registerFlavor({
		name: 'Catppuccin Mocha Blue',
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

registerFlavors([
	{
		name: 'rain',
		description: '☀️ blue theme',
		iconPath: '/flavor_icons/rain.png',
		isDark: false,
		cssVariables: {
			'--bg-color': '#ffffff',
			'--text-color': '#282828',
			'--secondary-text-color': '#ffffff',
			'--main-color': '#4273fa',
			'--sub-color': '#455fa8',
			'--sub-alt-color': '#eaeef5',
			'--color-success': '#40d672',
			'--color-warning': '#ffd63a',
			'--color-error': '#f7374f',
			'--nav-hover-bg': '#00000033',
			'--nav-bg': '#f4f4f4',
			'--nav-highlight': '#455fa8',
			'--nav-active-highlight': '#ffffff'
		}
	},
	{
		name: 'desert oasis',
		description: '☀️ katara taught aang waterbending here',
		iconPath: '/flavor_icons/desert-oasis.png',
		isDark: false,
		cssVariables: {
			'--bg-color': '#fffaee',
			'--text-color': '#2d3748',
			'--secondary-text-color': '#ffffff',
			'--main-color': '#95b643',
			'--sub-color': '#2b63ff',
			'--sub-alt-color': '#ecd8a6',
			'--color-success': '#16a34a',
			'--color-warning': '#ca8a04',
			'--color-error': '#dc2626',
			'--nav-hover-bg': '#fed7aa33',
			'--nav-bg': '#ffffff',
			'--nav-highlight': '#2b63ff',
			'--nav-active-highlight': '#000000'
		}
	},
	{
		name: 'shounen',
		description: '☀️ reading one for the first time',
		iconPath: '/flavor_icons/manga.png',
		isDark: false,
		cssVariables: {
			'--bg-color': '#ffffff',
			'--text-color': '#111111',
			'--secondary-text-color': '#ffffff',
			'--main-color': '#e63946',
			'--sub-color': '#000000',
			'--sub-alt-color': '#f4f4f4',
			'--color-success': '#40d672',
			'--color-warning': '#ffd63a',
			'--color-error': '#f7374f',
			'--nav-hover-bg': '#00000033',
			'--nav-bg': '#f4f4f4',
			'--nav-highlight': '#000000',
			'--nav-active-highlight': '#ffffff'
		}
	},
	{
		name: 'fire nation',
		description: '🌙 Uncle Iroh\'s favorite tea flavor',
		iconPath: '/flavor_icons/fire-nation.png',
		isDark: true,
		cssVariables: {
			'--bg-color': '#2b1a1a',
			'--text-color': '#fcefe3',
			'--secondary-text-color': '#ffffff',
			'--main-color': '#d6453d',
			'--sub-color': '#EDB308',
			'--sub-alt-color': '#442626',
			'--color-success': '#f4b860',
			'--color-warning': '#ff914d',
			'--color-error': '#e84a5f',
			'--nav-hover-bg': '#d6453d33',
			'--nav-bg': '#442626',
			'--nav-highlight': '#EDB308',
			'--nav-active-highlight': '#000000'
		}
	},
	{
		name: 'earth',
		description: '☀️',
		iconPath: '/flavor_icons/earth.png',
		isDark: false,
		cssVariables: {
			'--bg-color': '#ffffff',
			'--text-color': '#000000',
			'--secondary-text-color': '#ffffff',
			'--main-color': '#38885c',
			'--sub-color': '#43af73',
			'--sub-alt-color': '#faeed7',
			'--color-success': '#40d672',
			'--color-warning': '#ffd63a',
			'--color-error': '#f7374f',
			'--nav-hover-bg': '#00000033',
			'--nav-bg': '#000000',
			'--nav-highlight': '#ffffff',
			'--nav-active-highlight': '#ffffff'
		}
	},
]);
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
