import type { FlavorDefinition } from '$lib/types/flavor-definition';

export const flavors = new Map<string, FlavorDefinition>();

// Built-in flavors that come with the application
const builtInFlavorsList: FlavorDefinition[] = [
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
		name: 'desert-oasis',
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
		name: 'manga',
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
		name: 'fire-nation',
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
	}
];

// Initialize with built-in flavors
registerFlavors(builtInFlavorsList);

export function registerFlavor(definition: FlavorDefinition): void {
	if (!definition.name || definition.name.trim().length === 0) {
		throw new Error('Flavor name cannot be empty');
	}

	if (!definition.cssVariables || Object.keys(definition.cssVariables).length === 0) {
		throw new Error(`Flavor "${definition.name}" must have CSS variables`);
	}

	flavors.set(definition.name, definition);
}

export function registerFlavors(definitions: FlavorDefinition[]): void {
	for (const definition of definitions) {
		registerFlavor(definition);
	}
}

export function getFlavor(name: string): FlavorDefinition | undefined {
	return flavors.get(name);
}

export function unregisterFlavor(name: string): boolean {
	return flavors.delete(name);
}

export function applyFlavor(name: string): void {
	const definition = getFlavor(name);
	if (!definition) {
		console.error(`Flavor "${name}" not found in registry`);
		return;
	}

	const root = typeof document !== 'undefined' ? document.documentElement : null;
	if (root) {
		Object.entries(definition.cssVariables).forEach(([key, value]) => {
			root.style.setProperty(key, value);
		});

		root.setAttribute('data-flavor', name);
		root.setAttribute('data-flavor-type', definition.isDark ? 'dark' : 'light');
	}
}
