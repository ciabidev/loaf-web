import { writable } from 'svelte/store';
import { registerFlavors, getFlavor, applyFlavor } from '$lib/state/flavor-registry';
import { builtInFlavors } from '$lib/types/built-in-flavors';

// Initialize registry with built-in flavors
registerFlavors(builtInFlavors);

// default to the app's baseline flavor. the initial flavor/flavorType is
// handled in +layout.svelte to avoid SSR flash; stores only need sensible defaults.
const defaultFlavorName = 'rain';
const defaultFlavorDef = getFlavor(defaultFlavorName);
const defaultFlavorType = defaultFlavorDef?.isDark ? 'dark' : 'light';

export const flavor = writable<string>(defaultFlavorName);
export const flavorType = writable(defaultFlavorType);

// initialize from localStorage in the browser so the persisted choice
// is applied before any other client-side logic runs. This prevents the
// default store value from overwriting a user's saved preference.
if (typeof window !== 'undefined') {
  try {
    const f = localStorage.getItem('flavor');
    const t = localStorage.getItem('flavorType');
    if (f && getFlavor(f)) flavor.set(f);
    if (t) flavorType.set(t);
  } catch (e) {
  }
}

// persist changes to localStorage and keep flavorType in sync.
// guard with typeof window so this runs only in the browser.
flavor.subscribe(value => {
  if (typeof window !== 'undefined' && value) {
    try {
      const flavorDef = getFlavor(value);
      if (!flavorDef) {
        console.error(`Flavor "${value}" not found in registry`);
        return;
      }

      localStorage.setItem('flavor', value);
      const newFlavorType = flavorDef.isDark ? 'dark' : 'light';
      flavorType.set(newFlavorType);
      localStorage.setItem('flavorType', newFlavorType);

      applyFlavor(value);
    } catch (e) {
    }
  }
});