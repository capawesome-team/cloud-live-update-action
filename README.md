# Capawesome Cloud Live Update Action for GitHub Actions

[![CI](https://github.com/capawesome-team/cloud-live-update-action/actions/workflows/ci.yml/badge.svg)](https://github.com/capawesome-team/cloud-live-update-action/actions/workflows/ci.yml)
[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Capawesome%20Cloud%20Live%20Update-blue?logo=github)](https://github.com/marketplace/actions/capawesome-cloud-live-update-action)
[![License](https://img.shields.io/github/license/capawesome-team/cloud-live-update-action)](./LICENSE)

GitHub Action to deploy a Capacitor Live Update to the [Capawesome Cloud](https://cloud.capawesome.io/).

> [!NOTE]
> The `token` is sensitive and must be stored as an [encrypted secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets) (e.g. `CAPAWESOME_TOKEN`) rather than hardcoded in the workflow. We recommend pinning the action to a fixed version (e.g. `@v0.1.0`) for reproducible builds, as no moving major-version tag is maintained.

## Usage

```yaml
- uses: capawesome-team/cloud-live-update-action@v0.1.0
  with:
    # The Capawesome Cloud app ID.
    # Required.
    appId: ''
    # The exact Android version code (`versionCode`) that the bundle does not support.
    androidEq: ''
    # The maximum Android version code (`versionCode`) that the bundle supports.
    androidMax: ''
    # The minimum Android version code (`versionCode`) that the bundle supports.
    androidMin: ''
    # The artifact type to deploy. Must be either `zip` or `manifest`. Defaults to `zip`.
    artifactType: ''
    # The channel to deploy the bundle to.
    channel: ''
    # Custom properties to assign to the bundle, one `key=value` pair per line. Maximum of 10.
    customProperties: ''
    # The Git reference (branch, tag, or commit SHA) to associate with the bundle.
    gitRef: ''
    # The exact iOS bundle version (`CFBundleVersion`) that the bundle does not support.
    iosEq: ''
    # The maximum iOS bundle version (`CFBundleVersion`) that the bundle supports.
    iosMax: ''
    # The minimum iOS bundle version (`CFBundleVersion`) that the bundle supports.
    iosMin: ''
    # The path to the bundle to upload. Must be a folder or zip archive.
    # Required.
    path: ''
    # The private key to sign the bundle with. Either a path to a `.pem` file or the key content.
    privateKey: ''
    # The percentage of devices to deploy the bundle to (0-100). Defaults to 100.
    rolloutPercentage: ''
    # The Capawesome Cloud API token.
    # Required.
    token: ''
```

## Example

```yaml
name: Deploy Live Update
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Build web assets
        run: npm run build
      - name: Deploy Live Update
        uses: capawesome-team/cloud-live-update-action@v0.1.0
        with:
          appId: 'addb597c-9cbd-4cdc-bcc0-cd5c2234a03f'
          channel: 'production-1.0.0'
          gitRef: ${{ github.sha }}
          path: 'dist'
          token: ${{ secrets.CAPAWESOME_TOKEN }}
```

## Notes

- **Channel creation**: If you provide a `channel` that does not exist yet, it is created automatically before the bundle is uploaded.
- **Code signing**: Provide a `privateKey` to sign the bundle. See [Code Signing](https://capawesome.io/docs/cloud/live-updates/advanced/code-signing/) for details.
- **Staged rollouts**: Use `rolloutPercentage` to deploy the bundle to only a subset of devices.

## Breaking Changes

See [BREAKING.md](./BREAKING.md).

## License

See [LICENSE](./LICENSE).
