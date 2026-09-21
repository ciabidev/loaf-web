# loaf-web

A cozy, extensible component library for Svelte 5.

## Install

```sh
npm install @ciabi/loaf-web
```

just import the component stylesheet once near the root of your app to get started

```ts
import '@ciabi/loaf-web/styles.css';
```

The core stylesheet defines component tokens and shared component classes without changing page
sizing, overflow, resets, scrollbars, or loading web fonts. Optional styles are separate:

```ts
import '@ciabi/loaf-web/reset.css'; // Full-page shell, element reset, and scrollbar styling
import '@ciabi/loaf-web/fonts.css'; // Opt-in Google Fonts request
```

Applications that want the complete opinionated setup can import the bundle instead:

```ts
import '@ciabi/loaf-web/app.css'; // Core components + reset + hosted fonts
```

Without `fonts.css`, `--loaf-text-font` and `--loaf-code-font` use system font stacks. Override
either custom property to use self-hosted fonts.

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
	import { Basket, DialogHolder, FlavorPicker, Loaf, Navbar, NavTab } from '@ciabi/loaf-web';
	import '@ciabi/loaf-web/app.css';

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
		'--loaf-surface': '#fff8ed',
		'--loaf-surface-secondary': '#f4e8d4',
		'--loaf-text': '#342b25',
		'--loaf-text-on-accent': '#ffffff',
		'--loaf-accent': '#db7758'
	}
});
```

`registerFlavor` stores a copy of the definition. Use `getFlavor` or `listFlavors` to inspect
registered flavors, `applyFlavor` to apply one to the document root, and `unregisterFlavor` for
cleanup. Returned definitions are copies, so consumers cannot mutate the registry accidentally.

## Supported public API

- Layout: `Basket`, `Loaf`, `PageContainer`
- Navigation: `FlavorPicker`, `Navbar`, `NavbarLogo`, `NavTab`
- Inputs: `Carousel`, `Input`, `Selector`, `Switcher`, `Toggle`, `URLButton`
- Content: `Card`, `Codeblock`, `Contact`, `Emoticon`, `FormField`, `Markdown`, `Popover`, `Profile`, `Tags`
- Dialogs: `DialogHolder`, `createDialog`, `killDialog`
- Flavors: `registerFlavor`, `registerFlavors`, `getFlavor`, `listFlavors`, `applyFlavor`, `unregisterFlavor`, `flavor`, `flavorType`
- Flavor picker state: `flavorPickerVisible`, `openFlavorPicker`
- Public prop/configuration types: `CarouselItemType`, `DialogButton`, `DialogInfo`, `DialogPickerItem`, `PickerDialog`, `SmallDialog`, `SmallDialogIcons`, `Emotion`, `FlavorDefinition`, `Tag`

Only package-root exports and the documented stylesheet subpaths are supported. Files below
`dist/` are implementation details and should not be imported directly.

## Versioning

This project follows SemVer. While the package is in `0.x`, breaking public API changes may ship in
a minor release and fixes in a patch release. Starting with `1.0.0`, breaking changes require a new
major version. See [CHANGELOG.md](./CHANGELOG.md) for release notes.

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
npm run smoke:consumer
```
