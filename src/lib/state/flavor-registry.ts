import type { FlavorDefinition } from '$lib/types/flavor-definition';

export const flavors = new Map<string, FlavorDefinition>();

// Built-in flavors that come with the application


// Initialize with built-in flavors

export function registerFlavor(definition: FlavorDefinition): void {
	if (!definition.name || definition.name.trim().length === 0) {
		throw new Error('Flavor name cannot be empty');
	}

	if (!definition.cssVariables || Object.keys(definition.cssVariables).length === 0) {
		throw new Error(`Flavor "${definition.name}" must have CSS variables`);
	}

	flavors.set(definition.name, definition);

	// If this flavor is already selected via persisted data, apply it now.
	const root = typeof document !== 'undefined' ? document.documentElement : null;
	if (root && root.getAttribute('data-flavor') === definition.name) {
		applyFlavor(definition.name);
	}
}

export function registerFlavors(definitions: FlavorDefinition[]): void {
	for (const definition of definitions) {
		registerFlavor(definition);
	}
}

export function getFlavor(name: string): FlavorDefinition | undefined {
	// check if the flavor is registered
	if (!flavors.has(name)) {
		console.error(`Flavor "${name}" not found in registry`);
		return;
	}	return flavors.get(name);
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
