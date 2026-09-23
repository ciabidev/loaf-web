# changelog

all notable changes to this project are documented here. the project follows Semantic Versioning;
before 1.0, breaking changes may ship in a minor version.

## Unreleased (0.2.1)

- name the component library Loafkit UI and make `@ciabi/loafkit-ui` the primary install and import name.
- keep `@ciabi/loaf-web` updated from the same build on every release.

## 0.1.0 - released sep 2 2026

- prepare the first public Svelte 5 package release.
- export the component library, dialog controls, flavor registration API, and public types.
- split component, application reset, and hosted-font styles into explicit package exports.
- replace the mutable flavor registry export with copied `getFlavor` and `listFlavors` results.
- remove Git-hosted runtime icon dependencies and include the required HugeIcons MIT notice.
- add focused interaction tests, packed-consumer verification, and release automation.

# 0.1.1 - fixed "missing prop use" error in Selector

- thats all folks
