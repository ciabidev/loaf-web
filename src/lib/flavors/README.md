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
import { registerFlavor } from '@ciabi/loaf-web';

registerFlavor({
  name: 'midnight',
  description: '🌙 deep blue night theme',
  iconPath: '/flavor_icons/midnight.png',
  isDark: true,
  cssVariables: {
    '--loaf-surface': '#0f1419',
    '--loaf-text': '#e8eaed',
    '--loaf-text-on-accent': '#ffffff',
    '--loaf-accent': '#8ab4f8',
    '--loaf-accent-secondary': '#aecbfa',
    '--loaf-surface-secondary': '#202124',
    '--loaf-success': '#81c995',
    '--loaf-warning': '#fcc934',
    '--loaf-error': '#f28482',
    '--loaf-nav-hover-bg': '#8ab4f833',
    '--loaf-nav-bg': '#202124',
    '--loaf-nav-highlight': '#aecbfa',
    '--loaf-nav-active-highlight': '#ffffff'
  }
});
```

## CSS Variables

Each flavor must define CSS custom properties that are applied to the document root. Standard variables include:

### Layout & Colors

- `--loaf-surface`: Main background color
- `--loaf-text`: Primary text color
- `--loaf-text-on-accent`: Text color for elements on `--loaf-accent` backgrounds

### Accents

- `--loaf-accent`: Primary accent color (used everywhere)
- `--loaf-accent-secondary`: Secondary accent (links, smaller elements)
- `--loaf-surface-secondary`: Alternative background (buttons, cards)

### Status Colors

- `--loaf-success`: Success states (green by default)
- `--loaf-warning`: Warning states (yellow by default)
- `--loaf-error`: Error states (red by default)

### Navigation

- `--loaf-nav-bg`: Navigation bar background
- `--loaf-nav-hover-bg`: Navigation item hover state
- `--loaf-nav-highlight`: Navigation highlight color
- `--loaf-nav-active-highlight`: Active navigation item color

## Registering Flavors at Startup
To ensure custom flavors are available throughout the application, register them early. Create a file that auto-registers on import:
```typescript
// lib/customFlavors.ts
import { registerFlavors } from '@ciabi/loaf-web';
export const myCustomFlavors = [/* ... */];
registerFlavors(myCustomFlavors);
```

Then import this module in `+layout.svelte` to trigger registration at startup:
