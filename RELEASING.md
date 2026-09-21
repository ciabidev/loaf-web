# Releasing

## One-time npm setup

`@ciabi/loaf-web` has not been published yet, so its npm package settings do not exist. A package
owner must make the first `0.1.0` publication interactively from a clean, tagged commit:

1. Enable 2FA on the npm account that owns the `@ciabi` scope.
2. Run the full local audit: `npm ci`, `npm run quality`, and `npm run smoke:consumer`.
3. Sign in with `npm login`, then run `npm publish --access public` and complete the 2FA prompt.
   Do not create or commit an npm token.
4. On npmjs.com, open `@ciabi/loaf-web` → Settings → Trusted publishing and add a GitHub Actions
   publisher with organization `ciabidev`, repository `loaf-web`, and workflow filename
   `release.yml`. Allow direct `npm publish` for the checked-in workflow.
5. Under Publishing access, select **Require two-factor authentication and disallow tokens**.
   Revoke any legacy or granular write token that is no longer needed.

Trusted publishing requires npm 11.5.1 or newer and Node 22.14 or newer. The release workflow uses
Node 24 on a GitHub-hosted runner, requests only `contents: read` and `id-token: write`, and stores no
npm token. npm automatically attaches provenance for trusted publishes.

## Subsequent releases

1. Update the version and move the changelog entry from Unreleased to the release date.
2. Run `npm run quality` and `npm run smoke:consumer`.
3. Commit, tag the exact version as `v<package-version>`, and create a GitHub release from that tag.
4. The `release.yml` workflow verifies the tag, reruns the complete audit, and publishes through
   npm trusted publishing.

The workflow intentionally refuses to publish when the Git tag does not exactly match the version
in `package.json`.
