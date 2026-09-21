import { writable } from 'svelte/store';
import { applyFlavor, getFlavor } from './flavor-registry.js';

const defaultFlavor = 'rain';
const defaultFlavorDef = getFlavor(defaultFlavor);

let initialFlavor = defaultFlavor;
let initialFlavorType = defaultFlavorDef?.isDark ? 'dark' : 'light';

if (typeof window !== 'undefined') {
	try {
		const storedFlavor = localStorage.getItem('flavor');
		const storedFlavorType = localStorage.getItem('flavorType');
		const storedFlavorDef = storedFlavor ? getFlavor(storedFlavor) : undefined;

		if (storedFlavor) initialFlavor = storedFlavor;
		if (storedFlavorDef) initialFlavorType = storedFlavorDef.isDark ? 'dark' : 'light';
		if (storedFlavorType === 'dark' || storedFlavorType === 'light') {
			initialFlavorType = storedFlavorType;
		}
	} catch {
		// Storage can be unavailable in privacy modes; in-memory theming still works.
	}
}

export const flavor = writable(initialFlavor);
export const flavorType = writable(initialFlavorType);

let didInit = false;

flavor.subscribe((value) => {
	if (!didInit) {
		didInit = true;
		return;
	}

	if (typeof window === 'undefined' || !value) return;

	try {
		const flavorDef = getFlavor(value);
		if (!flavorDef) return;

		localStorage.setItem('flavor', value);
		const newFlavorType = flavorDef.isDark ? 'dark' : 'light';
		flavorType.set(newFlavorType);
		localStorage.setItem('flavorType', newFlavorType);
		applyFlavor(value);
	} catch {
		// Storage can be unavailable in privacy modes; applying the flavor is best effort.
	}
});
