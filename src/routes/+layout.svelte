<script lang="ts">
	import '$lib/styles/loaf.css';
	import Basket from '$components/layout/Basket.svelte';
	import Loaf from '$components/layout/Loaf.svelte';
	import Navbar from '$components/nav/Navbar.svelte';
	import type { Snippet } from 'svelte';
	import DialogHolder from '$components/dialog/DialogHolder.svelte';
	let { children }: { children: Snippet } = $props();
	import NavTab from '$components/nav/NavTab.svelte';
	import { page } from '$app/state';
	import MacroIcon from '~icons/streamline-flex/toaster-remix';

	import FlavorPicker from '$components/nav/FlavorPicker.svelte';
	import { registerFlavor, registerFlavors } from '$lib/state/flavor-registry';

	registerFlavor({
		name: 'Mocha Blue',
		description: 'Catppuccin Mocha with blue accents',
		iconPath: '/flavor_icons/catppuccin-mocha-blue.png',
		isDark: true,
		cssVariables: {
			'--loaf-surface': '#1e1e2e',
			'--loaf-text': '#cdd6f4',
			'--loaf-text-on-accent': '#1e1e2e',
			'--loaf-accent': '#89b4fa',
			'--loaf-accent-secondary': '#89b4fa',
			'--loaf-surface-secondary': '#181825',
			'--loaf-success': '#a6e3a1',
			'--loaf-warning': '#f9e2af',
			'--loaf-error': '#f38ba8',
			'--loaf-nav-bg': '#11111b',
			'--loaf-nav-hover-bg': '#313244',
			'--loaf-nav-highlight': '#cdd6f4',
			'--loaf-nav-active-highlight': '#11111b'
		}
	});

registerFlavors([
	{
		name: 'rain',
		description: '☀️ blue theme',
		iconPath: '/flavor_icons/rain.png',
		isDark: false,
		cssVariables: {
			'--loaf-surface': '#ffffff',
			'--loaf-text': '#282828',
			'--loaf-text-on-accent': '#ffffff',
			'--loaf-accent': '#4273fa',
			'--loaf-accent-secondary': '#455fa8',
			'--loaf-surface-secondary': '#eaeef5',
			'--loaf-success': '#40d672',
			'--loaf-warning': '#ffd63a',
			'--loaf-error': '#f7374f',
			'--loaf-nav-hover-bg': '#00000033',
			'--loaf-nav-bg': '#f4f4f4',
			'--loaf-nav-highlight': '#455fa8',
			'--loaf-nav-active-highlight': '#ffffff'
		}
	},
	{
		name: 'desert oasis',
		description: '☀️ katara taught aang waterbending here',
		iconPath: '/flavor_icons/desert-oasis.png',
		isDark: false,
		cssVariables: {
			'--loaf-surface': '#fffaee',
			'--loaf-text': '#2d3748',
			'--loaf-text-on-accent': '#ffffff',
			'--loaf-accent': '#95b643',
			'--loaf-accent-secondary': '#2b63ff',
			'--loaf-surface-secondary': '#ecd8a6',
			'--loaf-success': '#16a34a',
			'--loaf-warning': '#ca8a04',
			'--loaf-error': '#dc2626',
			'--loaf-nav-hover-bg': '#fed7aa33',
			'--loaf-nav-bg': '#ffffff',
			'--loaf-nav-highlight': '#2b63ff',
			'--loaf-nav-active-highlight': '#000000'
		}
	},
	{
		name: 'shounen',
		description: '☀️ reading one for the first time',
		iconPath: '/flavor_icons/manga.png',
		isDark: false,
		cssVariables: {
			'--loaf-surface': '#ffffff',
			'--loaf-text': '#111111',
			'--loaf-text-on-accent': '#ffffff',
			'--loaf-accent': '#e63946',
			'--loaf-accent-secondary': '#000000',
			'--loaf-surface-secondary': '#f4f4f4',
			'--loaf-success': '#40d672',
			'--loaf-warning': '#ffd63a',
			'--loaf-error': '#f7374f',
			'--loaf-nav-hover-bg': '#00000033',
			'--loaf-nav-bg': '#f4f4f4',
			'--loaf-nav-highlight': '#000000',
			'--loaf-nav-active-highlight': '#ffffff'
		}
	},
	{
		name: 'fire nation',
		description: '🌙 Uncle Iroh\'s favorite tea flavor',
		iconPath: '/flavor_icons/fire-nation.png',
		isDark: true,
		cssVariables: {
			'--loaf-surface': '#2b1a1a',
			'--loaf-text': '#fcefe3',
			'--loaf-text-on-accent': '#ffffff',
			'--loaf-accent': '#d6453d',
			'--loaf-accent-secondary': '#EDB308',
			'--loaf-surface-secondary': '#442626',
			'--loaf-success': '#f4b860',
			'--loaf-warning': '#ff914d',
			'--loaf-error': '#e84a5f',
			'--loaf-nav-hover-bg': '#d6453d33',
			'--loaf-nav-bg': '#442626',
			'--loaf-nav-highlight': '#EDB308',
			'--loaf-nav-active-highlight': '#000000'
		}
	},
	{
		name: 'earth',
		description: '☀️',
		iconPath: '/flavor_icons/earth.png',
		isDark: false,
		cssVariables: {
			'--loaf-surface': '#ffffff',
			'--loaf-text': '#000000',
			'--loaf-text-on-accent': '#ffffff',
			'--loaf-accent': '#38885c',
			'--loaf-accent-secondary': '#43af73',
			'--loaf-surface-secondary': '#faeed7',
			'--loaf-success': '#40d672',
			'--loaf-warning': '#ffd63a',
			'--loaf-error': '#f7374f',
			'--loaf-nav-hover-bg': '#00000033',
			'--loaf-nav-bg': '#000000',
			'--loaf-nav-highlight': '#ffffff',
			'--loaf-nav-active-highlight': '#ffffff'
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
<Basket>
	<FlavorPicker />
	<DialogHolder />

	<Loaf>
		{@render children()}
	</Loaf>

	<Navbar position="left-bottom">
		<NavTab name="test" Icon={MacroIcon} path="/" active={page.url.pathname === '/'} />
		<NavTab name="404" Icon={MacroIcon} path="/404" active={page.status === 404} />
	</Navbar>
</Basket>
