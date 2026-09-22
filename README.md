# loaf-web

a cozy, extensible component library for Svelte 5.

## install

```sh
npm install @ciabi/loaf-web
```

just import the component stylesheet once near the root of your app to get started.

```ts
import '@ciabi/loaf-web/styles.css';
```

the core stylesheet defines component tokens and shared component classes without changing page
sizing, overflow, resets, scrollbars, or loading web fonts. the optional styles are separate:

```ts
import '@ciabi/loaf-web/reset.css'; // Full-page shell, element reset, and scrollbar styling
import '@ciabi/loaf-web/fonts.css'; // Opt-in Google Fonts request
```

if you want the complete setup, import the bundle instead:

```ts
import '@ciabi/loaf-web/app.css'; // Core components + reset + hosted fonts
```

without `fonts.css`, `--loaf-text-font` and `--loaf-code-font` use system font stacks. override
either custom property if you want to use self-hosted fonts.

then import components from the package root:

```svelte
<script lang="ts">
	import { Card, Toggle } from '@ciabi/loaf-web';

	let enabled = $state(false);
</script>

<Card name="cozy settings">
	<Toggle {enabled} onClick={() => (enabled = !enabled)} />
</Card>
```

## app layout

the layout pieces are composable. add only what your app needs:

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

routing stays in the consuming app. pass `active` to the current `NavTab` instead of coupling the
component library to a specific router.

## flavors/themes

themes in loaf-web are called **Flavors**

components use CSS custom properties, so you can override individual design tokens or register
complete flavors:

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

`registerFlavor` stores a copy of the definition. use `getFlavor` or `listFlavors` to inspect
registered flavors, `applyFlavor` to apply one to the document root, and `unregisterFlavor` to
clean one up. returned definitions are copies, so you can't accidentally mutate the registry.

### saving/loading flavors

loaf-web does save flavors but does not automatically load them. to load flavors on start, add this js snippet near the root of your app:

```js
try {
	const f = localStorage.getItem('flavor') || 'none'; // or whatever fallback flavor u want;
	const t = localStorage.getItem('flavorType');
	if (f) document.documentElement.setAttribute('data-flavor', f);
	if (t) document.documentElement.setAttribute('data-flavor-type', t);
} catch (e) {
	// ignore localStorage errors (e.g., in private mode)
}
```

we are thinking of adding support for custom flavor loading later but for now u gotta do this gimmicky fix lol

## supported public API

- Layout: `Basket`, `Loaf`, `PageContainer`
- Navigation: `FlavorPicker`, `Navbar`, `NavbarLogo`, `NavTab`
- Inputs: `Carousel`, `Input`, `Selector`, `Switcher`, `Toggle`, `URLButton`
- Content: `Card`, `Codeblock`, `Contact`, `Emoticon`, `FormField`, `Markdown`, `Popover`, `Profile`, `Tags`
- Dialogs: `DialogHolder`, `createDialog`, `killDialog`
- Flavors: `registerFlavor`, `registerFlavors`, `getFlavor`, `listFlavors`, `applyFlavor`, `unregisterFlavor`, `flavor`, `flavorType`
- Flavor picker state: `flavorPickerVisible`, `openFlavorPicker`
- Public prop/configuration types: `CarouselItemType`, `DialogButton`, `DialogInfo`, `DialogPickerItem`, `PickerDialog`, `SmallDialog`, `SmallDialogIcons`, `Emotion`, `FlavorDefinition`, `Tag`

only package-root exports and the documented stylesheet subpaths are supported. files below `dist/`
are implementation details, so don't import them directly.

## versioning

this project follows SemVer. while the package is in `0.x`, breaking public API changes may ship in
a minor release and fixes in a patch release. starting with `1.0.0`, breaking changes require a new
major version. see [CHANGELOG.md](./CHANGELOG.md) for release notes.

## development

```sh
npm install
npm run dev
```

the root route is the component gallery and manual regression page.

build and validate the publishable package with:

```sh
npm run package
npx publint
npm pack --dry-run
npm run smoke:consumer
```
