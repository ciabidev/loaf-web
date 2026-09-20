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
			'--surface': '#1e1e2e',
			'--text': '#cdd6f4',
			'--text-on-accent': '#1e1e2e',
			'--accent': '#89b4fa',
			'--accent-secondary': '#89b4fa',
			'--surface-secondary': '#181825',
			'--success': '#a6e3a1',
			'--warning': '#f9e2af',
			'--error': '#f38ba8',
			'--nav-bg': '#11111b',
			'--nav-hover-bg': '#313244',
			'--nav-highlight': '#cdd6f4',
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
			'--surface': '#ffffff',
			'--text': '#282828',
			'--text-on-accent': '#ffffff',
			'--accent': '#4273fa',
			'--accent-secondary': '#455fa8',
			'--surface-secondary': '#eaeef5',
			'--success': '#40d672',
			'--warning': '#ffd63a',
			'--error': '#f7374f',
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
			'--surface': '#fffaee',
			'--text': '#2d3748',
			'--text-on-accent': '#ffffff',
			'--accent': '#95b643',
			'--accent-secondary': '#2b63ff',
			'--surface-secondary': '#ecd8a6',
			'--success': '#16a34a',
			'--warning': '#ca8a04',
			'--error': '#dc2626',
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
			'--surface': '#ffffff',
			'--text': '#111111',
			'--text-on-accent': '#ffffff',
			'--accent': '#e63946',
			'--accent-secondary': '#000000',
			'--surface-secondary': '#f4f4f4',
			'--success': '#40d672',
			'--warning': '#ffd63a',
			'--error': '#f7374f',
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
			'--surface': '#2b1a1a',
			'--text': '#fcefe3',
			'--text-on-accent': '#ffffff',
			'--accent': '#d6453d',
			'--accent-secondary': '#EDB308',
			'--surface-secondary': '#442626',
			'--success': '#f4b860',
			'--warning': '#ff914d',
			'--error': '#e84a5f',
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
			'--surface': '#ffffff',
			'--text': '#000000',
			'--text-on-accent': '#ffffff',
			'--accent': '#38885c',
			'--accent-secondary': '#43af73',
			'--surface-secondary': '#faeed7',
			'--success': '#40d672',
			'--warning': '#ffd63a',
			'--error': '#f7374f',
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
