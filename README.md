# loaf-web

A cozy, extensible component library for Svelte 5.

## Install

```sh
npm install @ciabi/loaf-web
```

Import the shared stylesheet once near the root of your app:

```ts
import '@ciabi/loaf-web/styles.css';
```

Then import components from the package root:

```svelte
<script lang="ts">
	import { Card, Toggle } from '@ciabi/loaf-web';

	let enabled = $state(false);
</script>

<Card name="Cozy settings">
	<Toggle {enabled} onClick={() => (enabled = !enabled)} />
</Card>
```

## App layout

The layout pieces are composable. Add only the features an app needs:

```svelte
<script lang="ts">
	import {
		Basket,
		DialogHolder,
		FlavorPicker,
		Loaf,
		Navbar,
		NavTab
	} from '@ciabi/loaf-web';
	import '@ciabi/loaf-web/styles.css';

	let { children } = $props();
</script>

<Basket>
	<FlavorPicker />
	<DialogHolder />

	<Loaf>
		{@render children()}
	</Loaf>

	<Navbar position="left-bottom">
		<NavTab name="Home" path="/" active />
	</Navbar>
</Basket>
```

Routing stays in the consuming app. Pass `active` to the current `NavTab` instead of coupling the component library to a specific router.

## Themes

Components use CSS custom properties, so an app can override individual design tokens or register complete flavors:

```ts
import { registerFlavor } from '@ciabi/loaf-web';

registerFlavor({
	name: 'warm toast',
	description: 'A warm light flavor',
	iconPath: '/flavors/warm-toast.png',
	isDark: false,
	cssVariables: {
		'--surface': '#fff8ed',
		'--surface-secondary': '#f4e8d4',
		'--text-color': '#342b25',
		'--secondary-text-color': '#ffffff',
		'--accent': '#db7758'
	}
});
```

## Development

```sh
npm install
npm run dev
```

The root route is the component gallery and manual regression page.

Build and validate the publishable package with:

```sh
npm run package
npx publint
npm pack --dry-run
```
