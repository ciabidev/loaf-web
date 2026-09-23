# Loafkit UI

Loafkit UI is a cozy, themeable component library for Svelte 5. use it to build your own site from
scratch with the components and styles you want.

- heavily inspired by [cobalt's ui](https://cobalt.tools), make sure to check them out

Loafkit is a separate SvelteKit starter template that hasn't been released yet. it'll give you a
site that's already set up with Loafkit UI. the starter won't have extra component capabilities:
everything it uses from this library is available here too. choose Loafkit UI if you want to set
up your own site from scratch; choose the starter later if you want the setup done for you.

## install

```sh
npm install @ciabi/loafkit-ui
```

`@ciabi/loaf-web` is also available for existing apps. it gets the same components and CSS on every
release. existing imports like `import { Card } from '@ciabi/loaf-web'` and
`import '@ciabi/loaf-web/app.css'` keep working.

## setup

### app layout

the layout pieces are composable. here's a template you can put in your layout.svelte:

```svelte
<script lang="ts">
	import { Basket, DialogHolder, FlavorPicker, Loaf, Navbar, NavTab } from '@ciabi/loafkit-ui';
	import '@ciabi/loafkit-ui/app.css';

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

we dont handle navigation routing, so pass `active` to the current `NavTab`

### using components

then import components from the package root:

```svelte
<script lang="ts">
	import { Card, Selector } from '@ciabi/loafkit-ui';

	let selectedOption = $state('Luffy');
</script>

<Card name="Ciabatta" description="Cards can have just about anything in them">
	<p>a dropdown menu</p>
	<Selector
		id="dropdown-example"
		title="strawhat dropdown menu"
		options={[
			{ value: 'Luffy', text: 'Luffy' },
			{ value: 'Zoro', text: 'Zoro' },
			{ value: 'Nami', text: 'Nami' },
			{ value: 'Usopp', text: 'Usopp' },
			{ value: 'Sanji', text: 'Sanji' },
			{ value: 'Chopper', text: 'Chopper' },
			{ value: 'Robin', text: 'Robin' },
			{ value: 'Franky', text: 'Franky' },
			{ value: 'Brook', text: 'Brook' },
			{ value: 'Jinbei', text: 'Jinbe' }
		]}
		bind:selected={selectedOption}
	/>
</Card>
```

### fonts

just import the stylesheet bundle once near the root of your app to get started.

```ts
import '@ciabi/loafkit-ui/app.css'; // Core components + reset + hosted fonts
```

you can also choose which ones you want to include:

```ts
import '@ciabi/loafkit-ui/styles.css';
import '@ciabi/loafkit-ui/reset.css'; // element reset and scrollbar styling
import '@ciabi/loafkit-ui/fonts.css'; // opt-in font request, our pick
```

the variables for fonts are `--loaf-text-font` and `--loaf-code-font` and can be overridden.

## flavors/themes

themes in Loafkit UI are called **Flavors**

components use CSS custom properties, so you can override individual design tokens or register
complete flavors:

```ts
import { registerFlavor } from '@ciabi/loafkit-ui';

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

Loafkit UI does save flavors but does not automatically load them. to load flavors on start, add this js snippet near the root of your app:

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
