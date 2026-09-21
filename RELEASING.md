# releasing

## one-time npm setup

`@ciabi/loaf-web` has not been published yet, so its npm package settings do not exist. a package
owner has to make the first `0.1.0` publication interactively from a clean, tagged commit:

1. enable 2FA on the npm account that owns the `@ciabi` scope.
2. run the full local audit: `npm ci`, `npm run quality`, and `npm run smoke:consumer`.
3. sign in with `npm login`, then run `npm publish --access public` and finish the 2FA prompt.
   don't create or commit an npm token.
4. on npmjs.com, open `@ciabi/loaf-web` → Settings → Trusted publishing and add a GitHub Actions
   publisher with organization `ciabidev`, repository `loaf-web`, and workflow filename
   `release.yml`. allow direct `npm publish` for the checked-in workflow.
5. under Publishing access, select **Require two-factor authentication and disallow tokens**.
   revoke any old or granular write token that isn't needed anymore.

trusted publishing needs npm 11.5.1 or newer and Node 22.14 or newer. the release workflow uses
Node 24 on a GitHub-hosted runner, only asks for `contents: read` and `id-token: write`, and stores no
npm token. npm adds provenance to trusted publishes automatically.

## subsequent releases

1. update the version and move the changelog entry from Unreleased to the release date.
2. run `npm run quality` and `npm run smoke:consumer`.
3. commit, tag the exact version as `v<package-version>`, and create a GitHub release from that tag.
4. the `release.yml` workflow verifies the tag, reruns the complete audit, and publishes through
   npm trusted publishing.

the workflow refuses to publish when the Git tag doesn't exactly match the version in `package.json`.
