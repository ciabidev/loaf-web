# Loafkit

**Loafkit** is a Svelte 5 ecosystem designed to help you build cozy, beautifully styled web applications quickly. 

### The Ecosystem

* **Loafkit** *(Coming Soon)* — A full SvelteKit starter template. It comes as a pre-configured, ready-to-build site for when you want the initial boilerplate and framework setup done for you.
* **Loafkit UI** *(Available Now)* — A cozy, themeable component library for Svelte 5. It powers the Loafkit starter template, but you can use it on its own if you prefer building your project from scratch or adding components to an existing app.

---

## Loafkit UI

This repository houses **Loafkit UI**. Install `@ciabi/loafkit-ui` to start using its components and styles:

```sh
npm install @ciabi/loafkit-ui
```

> **Upgrading from `@ciabi/loaf-web`?**  
> Existing projects using `@ciabi/loaf-web` do not need to change anything. Both package names receive identical updates, support the exact same component imports, and share CSS subpaths.

Check out the [Package README](./package/README.md) for full setup instructions. We dont have a documentation (yet)

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
