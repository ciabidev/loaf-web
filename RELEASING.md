# releasing Loafkit UI

one GitHub release publishes the same built library as `@ciabi/loafkit-ui` and `@ciabi/loaf-web`.
the release workflow runs quality and the packed consumer smoke check once, then publishes both
staged packages. both names use the version in the root `package.json`.

## one-time npm setup for the first dual-name release

`@ciabi/loaf-web@0.2.0` already exists. `@ciabi/loafkit-ui` needs one manual bootstrap publish
before npm will let you configure trusted publishing for it. do this before creating the GitHub
release:

1. make sure you own the `@ciabi` scope and have 2FA enabled on npm. confirm
   `@ciabi/loafkit-ui` is available.
2. commit the release changes, then run `npm ci`, `npm run quality`, and
   `npm run smoke:consumer` from that commit.
3. run `npm pkg set version=0.0.0 --prefix .release/loafkit-ui` to change only the staged
   Loafkit UI package. sign in with `npm login`, then run
   `npm publish .release/loafkit-ui --access public` and complete the 2FA prompt. this publishes
   the built library as a bootstrap `0.0.0`; it does not use the release version `0.2.1`.
   run `npm run stage:packages` afterward to restore the local staged version.
4. on npmjs.com, confirm or add a GitHub Actions trusted publisher on **both** package settings pages:
   organization `ciabidev`, repository `loaf-web`, workflow filename `release.yml`, environment
   `npm`. allow direct `npm publish` for each connection. the GitHub `npm` environment must exist
   and allow the release job to run.
5. after both trusted publishers are configured, choose **Require two-factor authentication and
   disallow tokens** under Publishing access for each package if you want to block future token
   publishes. do not create or commit an npm token.

the first GitHub release then publishes `0.2.1` under both names through trusted publishing. the
bootstrap package can stay at `0.0.0`; `latest` moves to `0.2.1` when the workflow publishes.

trusted publishing requires npm 11.5.1 or newer and Node 22.14 or newer. the workflow uses Node
24 on a GitHub-hosted runner, with `contents: read` and `id-token: write`. npm adds provenance to
trusted publishes automatically.

## each release

1. update the root version and changelog. use a version higher than every published version under
   **both** npm names; `0.2.1` is the first dual-name version because `loaf-web@0.2.0` exists.
2. run `npm ci`, `npm run quality`, and `npm run smoke:consumer`. inspect both dry runs with
   `npm pack .release/loafkit-ui --dry-run` and `npm pack .release/loaf-web --dry-run`.
3. commit the changes, tag the exact version as `v<package-version>`, and create **one** GitHub
   release from that tag.
4. check that the `Release` workflow publishes both names and that both npm package pages show the
   same version. the workflow refuses to publish if the tag differs from `package.json`.

if one npm publish succeeds and the other fails, keep the same tag and fix the cause before
retrying. npm will reject republishing the successful name and version, so publish the missing
staged package separately from the same tagged commit after its trusted publisher is fixed.
