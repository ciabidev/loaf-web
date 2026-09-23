# flavor system (themes)

the flavor system provides a way to register and manage themes in the application. themes used to be
hardcoded in css files. now, they're registerable and extensible.

## overview

the flavor system has:

- **flavor registry**: keeps track of every available flavor
- **flavor definitions**: TypeScript definitions that describe a flavor
- **built-in flavors**: pre-configured themes that ship with the app

## `flavor-registry.ts` functions

use these functions to register and retrieve flavors:

```typescript
registerFlavor(definition): Register a single flavor
registerFlavors(definitions): Register multiple flavors
getFlavor(name): Get a flavor by name
listFlavors(): Get copies of every registered flavor
applyFlavor(name): Apply flavor CSS to DOM
unregisterFlavor(name): Remove a flavor from registry
```

the registry is intentionally private. definitions returned by `getFlavor` and `listFlavors` are
copies; update a flavor by registering a new definition with the same name.

## using custom flavors

### basic example

```typescript
import { registerFlavor } from '@ciabi/loafkit-ui';

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

## CSS variables

each flavor must define CSS custom properties that get applied to the document root. the standard
variables are:

### layout & colors

- `--loaf-surface`: Main background color
- `--loaf-text`: Primary text color
- `--loaf-text-on-accent`: Text color for elements on `--loaf-accent` backgrounds

### accents

- `--loaf-accent`: Primary accent color (used everywhere)
- `--loaf-accent-secondary`: Secondary accent (links, smaller elements)
- `--loaf-surface-secondary`: Alternative background (buttons, cards)

### status colors

- `--loaf-success`: Success states (green by default)
- `--loaf-warning`: Warning states (yellow by default)
- `--loaf-error`: Error states (red by default)

### navigation

- `--loaf-nav-bg`: Navigation bar background
- `--loaf-nav-hover-bg`: Navigation item hover state
- `--loaf-nav-highlight`: Navigation highlight color
- `--loaf-nav-active-highlight`: Active navigation item color

## registering flavors at startup

to make custom flavors available everywhere, register them early. create a file that registers them
when imported:

```typescript
// lib/customFlavors.ts
import { registerFlavors } from '@ciabi/loafkit-ui';
export const myCustomFlavors = [
	/* ... */
];
registerFlavors(myCustomFlavors);
```

then import this module in the consuming app's root layout to register everything at startup.
