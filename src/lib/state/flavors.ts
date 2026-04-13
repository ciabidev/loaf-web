import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { getFlavor, applyFlavor } from '$lib/state/flavor-registry';

// default to the app's baseline flavor. the initial flavor/flavorType is
// handled in +layout.svelte to avoid SSR flash; stores only need sensible defaults.
const defaultFlavor = 'rain';
const defaultFlavorDef = getFlavor(defaultFlavor);
const defaultFlavorType = defaultFlavorDef?.isDark ? 'dark' : 'light';

let initialFlavor = defaultFlavor;
let initialFlavorType = defaultFlavorType;

if (browser) {
  try {
    const storedFlavor = localStorage.getItem('flavor');
    const storedFlavorType = localStorage.getItem('flavorType');
    const storedFlavorDef = storedFlavor ? getFlavor(storedFlavor) : undefined;

    if (storedFlavor) {
      if (storedFlavorDef) {
        initialFlavorType = storedFlavorDef.isDark ? 'dark' : 'light';
      }
    }

    if (storedFlavorType === 'dark' || storedFlavorType === 'light') {
      initialFlavorType = storedFlavorType;
    }
  } catch (e) {
    console.error(e);
  }
}

export const flavor = writable<string>(initialFlavor);
export const flavorType = writable(initialFlavorType);

// persist changes to localStorage and keep flavorType in sync.
// guard with typeof window so this runs only in the browser.
let didInit = false;

flavor.subscribe(value => {
  if (!didInit) {
    didInit = true;
    return;
  }

  if (typeof window !== 'undefined' && value) {
    try {
      const flavorDef = getFlavor(value);
      if (!flavorDef) {
        console.error(`Flavor "${value}" not found in registry`);
        return;
      }

      console.log('setting flavor to ' + value);
      localStorage.setItem('flavor', value);
      const newFlavorType = flavorDef.isDark ? 'dark' : 'light';
      flavorType.set(newFlavorType);
      localStorage.setItem('flavorType', newFlavorType);

      applyFlavor(value);
    } catch (e) {
      console.error(e);
    }
  }
});
