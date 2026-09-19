# Flavor System (Themes)

the Flavor system provides an extensible, developer-friendly way to register and manage themes in the application. Previously, themes were hardcoded in CSS files. now, they are fully registerable and extensible.

## Overview

the flavor system consists of:

- **Flavor Registry**: Central registry that manages all available flavors
- **Flavor Definitions**: TypeScript definitions that describe a flavor's properties
- **Built-in Flavors**: Pre-configured themes that ship with the app

## `flavor-registry.ts` Functions
 
Functions for managing registration and retrieval of flavors:

```typescript
registerFlavor(definition): Register a single flavor
registerFlavors(definitions): Register multiple flavors
getFlavor(name): Get a flavor by name
applyFlavor(name): Apply flavor CSS to DOM
unregisterFlavor(name): Remove a flavor from registry
```

## Using Custom Flavors

### Basic Example

```typescript
import { registerFlavor } from '$lib/state/flavor-registry';

registerFlavor({
  name: 'midnight',
  description: '🌙 deep blue night theme',
  iconPath: '/flavor_icons/midnight.png',
  isDark: true,
  cssVariables: {
    '--surface': '#0f1419',
    '--text-color': '#e8eaed',
    '--secondary-text-color': '#ffffff',
    '--accent': '#8ab4f8',
    '--accent-secondary': '#aecbfa',
    '--surface-secondary': '#202124',
    '--color-success': '#81c995',
    '--color-warning': '#fcc934',
    '--color-error': '#f28482',
    '--nav-hover-bg': '#8ab4f833',
    '--nav-bg': '#202124',
    '--nav-highlight': '#aecbfa',
    '--nav-active-highlight': '#ffffff'
  }
});
```

## CSS Variables

Each flavor must define CSS custom properties that are applied to the document root. Standard variables include:

### Layout & Colors

- `--surface`: Main background color
- `--text-color`: Primary text color
- `--secondary-text-color`: Text color for elements on `--accent` backgrounds

### Accents

- `--accent`: Primary accent color (used everywhere)
- `--accent-secondary`: Secondary accent (links, smaller elements)
- `--surface-secondary`: Alternative background (buttons, cards)

### Status Colors

- `--color-success`: Success states (green by default)
- `--color-warning`: Warning states (yellow by default)
- `--color-error`: Error states (red by default)

### Navigation

- `--nav-bg`: Navigation bar background
- `--nav-hover-bg`: Navigation item hover state
- `--nav-highlight`: Navigation highlight color
- `--nav-active-highlight`: Active navigation item color

## Registering Flavors at Startup
To ensure custom flavors are available throughout the application, register them early. Create a file that auto-registers on import:
```typescript
// lib/customFlavors.ts
import { registerFlavors } from '$lib/state/flavor-registry';
export const myCustomFlavors = [/* ... */];
registerFlavors(myCustomFlavors);
```

Then import this module in `+layout.svelte` to trigger registration at startup: