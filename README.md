# Loafkit UI

this repository contains Loafkit UI, a cozy, themeable component library for Svelte 5. install
`@ciabi/loafkit-ui` to build your own site from scratch with its components and styles.

```sh
npm install @ciabi/loafkit-ui
```

existing apps can keep using `@ciabi/loaf-web`. both npm names get the same library updates and
support the same component imports and CSS subpaths. see the [package README](./package/README.md)
for setup, examples, flavors, and the public API.

## Loafkit and Loafkit UI

Loafkit is a SvelteKit starter template planned for later. it'll come with a site already set up so
you can start building from there. the starter will use Loafkit UI, so it won't have extra component
capabilities that aren't available in this library. use Loafkit UI if you'd rather start your own
site from scratch, or use the Loafkit starter later if you want the setup done for you.

## development

```sh
npm ci
npm run dev
```

the root route is the component gallery and manual regression page. `src/lib` contains the library
source, and `npm run package` builds the files published to npm.

before a release, run `npm run quality` and `npm run smoke:consumer`. the smoke check packs and
installs both npm names from the same build. see [RELEASING.md](./RELEASING.md) for the first
dual-name release setup and later releases.
