# Capawesome Cloud Live Update Action for GitHub Actions

[![CI](https://github.com/capawesome-team/cloud-live-update-action/actions/workflows/ci.yml/badge.svg)](https://github.com/capawesome-team/cloud-live-update-action/actions/workflows/ci.yml)
[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Capawesome%20Cloud%20Live%20Update-blue?logo=github)](https://github.com/marketplace/actions/capawesome-cloud-live-update-action-for-github-actions)
[![License](https://img.shields.io/github/license/capawesome-team/cloud-live-update-action)](./LICENSE)

GitHub Action to deploy a Capacitor Live Update to the [Capawesome Cloud](https://cloud.capawesome.io/).

The action supports all three deployment modes:

- **Upload** a locally built bundle (`path`).
- **Build** the web assets in the cloud using Capawesome Cloud Runners (`environment`, `certificate`, `stack`, `variables`, `variableFile`, or a bare `gitRef`).
- **Register** a self-hosted bundle URL (`url`).

The mode is detected automatically from the inputs you provide — see [Notes](#notes).

> [!NOTE]
> The `token` is sensitive and must be stored as an [encrypted secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets) (e.g. `CAPAWESOME_TOKEN`) rather than hardcoded in the workflow. We recommend pinning the action to a fixed version (e.g. `@v0.1.0`) for reproducible builds, as no moving major-version tag is maintained.

## Related Actions

- [Capawesome Cloud Build Action](https://github.com/capawesome-team/cloud-build-action) — Create native iOS and Android app builds on Capawesome Cloud Runners.

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
    # The artifact type to deploy. Must be either `zip` or `manifest`. Defaults to `zip`. Used with cloud uploads only.
    artifactType: ''
    # The name of the certificate to use for the cloud build. Triggers a cloud build.
    certificate: ''
    # The channel(s) to deploy to, one per line or comma-separated. Deploying to multiple channels is supported for cloud builds only.
    channel: ''
    # Custom properties to assign to the bundle, one `key=value` pair per line or comma-separated. Maximum of 10.
    customProperties: ''
    # The name of the environment to use for the cloud build. Triggers a cloud build.
    environment: ''
    # The Git reference (branch, tag, or commit SHA) to associate with the bundle. For cloud builds, the reference that is built.
    gitRef: ''
    # The exact iOS bundle version (`CFBundleVersion`) that the bundle does not support.
    iosEq: ''
    # The maximum iOS bundle version (`CFBundleVersion`) that the bundle supports.
    iosMax: ''
    # The minimum iOS bundle version (`CFBundleVersion`) that the bundle supports.
    iosMin: ''
    # For cloud uploads, the path to the bundle to upload (a folder or zip archive).
    # For cloud builds, the path to the local source files.
    # For self-hosted bundles, an optional zip archive used for code signing only.
    path: ''
    # The private key to sign the bundle with. Either a path to a `.pem` file or the key content. Used with cloud uploads and self-hosted bundles only.
    privateKey: ''
    # The percentage of devices to deploy the bundle to (0-100). Defaults to 100.
    rolloutPercentage: ''
    # The build stack to use for the cloud build (e.g. `macos-sequoia` or `macos-tahoe`). Triggers a cloud build.
    stack: ''
    # For self-hosted bundles, the URL of the bundle to register. For cloud builds, the URL of a zip archive to use as the build source.
    url: ''
    # Path to a `.env` file with environment variables for the cloud build. Triggers a cloud build.
    variableFile: ''
    # Environment variables for the cloud build, one `key=value` pair per line or comma-separated. Triggers a cloud build.
    variables: ''
    # The Capawesome Cloud API token.
    # Required.
    token: ''
```

## Examples

### Upload a local bundle

Build the web assets in the workflow and upload the resulting bundle.

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

### Build in the cloud

Build the web assets in the cloud using Capawesome Cloud Runners. No checkout or local build step is required.

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
      - name: Deploy Live Update
        uses: capawesome-team/cloud-live-update-action@v0.1.0
        with:
          appId: 'addb597c-9cbd-4cdc-bcc0-cd5c2234a03f'
          channel: 'production-1.0.0'
          environment: 'production'
          gitRef: ${{ github.sha }}
          token: ${{ secrets.CAPAWESOME_TOKEN }}
```

### Register a self-hosted bundle

Register a bundle that is hosted on your own infrastructure instead of uploading it.

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
      - name: Deploy Live Update
        uses: capawesome-team/cloud-live-update-action@v0.1.0
        with:
          appId: 'addb597c-9cbd-4cdc-bcc0-cd5c2234a03f'
          channel: 'production-1.0.0'
          gitRef: ${{ github.sha }}
          url: 'https://cdn.example.com/bundles/1.0.0.zip'
          token: ${{ secrets.CAPAWESOME_TOKEN }}
```

## Notes

- **Deployment mode**: The mode is detected automatically from the inputs, in this order:
  1. If any of `certificate`, `environment`, `stack`, `variables`, or `variableFile` is set → **cloud build** ([`apps:liveupdates:create`](https://capawesome.io/docs/cloud/cli/commands/)).
  2. Otherwise, if `url` is set → **register a self-hosted bundle** ([`apps:liveupdates:register`](https://capawesome.io/docs/cloud/cli/commands/)).
  3. Otherwise, if `path` is set → **upload a local bundle** ([`apps:liveupdates:upload`](https://capawesome.io/docs/cloud/cli/commands/)).
  4. Otherwise → **cloud build** from `gitRef`.
- **Channel creation**: If you provide a `channel` that does not exist yet, it is created automatically before the bundle is deployed. Provide multiple channels to deploy to all of them (cloud builds only).
- **List inputs**: `channel`, `customProperties`, and `variables` accept multiple values either one per line or comma-separated. If the input spans multiple lines, only newlines split it and commas are kept literal; a single-line input is split on commas. So if any value contains a comma, use the multi-line (`|`) form — this applies even when there is only a single value:
  ```yaml
  variables: |
    url=https://example.com?a=1,b=2
  ```
- **Code signing**: Provide a `privateKey` to sign the bundle (cloud uploads and self-hosted bundles). See [Code Signing](https://capawesome.io/docs/cloud/live-updates/advanced/code-signing/) for details.
- **Staged rollouts**: Use `rolloutPercentage` to deploy the bundle to only a subset of devices.

## Breaking Changes

See [BREAKING.md](./BREAKING.md).

## License

See [LICENSE](./LICENSE).
