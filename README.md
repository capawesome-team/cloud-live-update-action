# cloud-live-update-action

GitHub Action to deploy a Capacitor Live Update to the [Capawesome Cloud](https://capawesome.io/cloud/).

## Usage

```yaml
- uses: capawesome-team/cloud-live-update-action@v0.0.1
  with:
    # The Capawesome Cloud app ID.
    # Required.
    appId: ''
    # The channel to deploy the update to.
    channel: ''
    # The path to the bundle to upload. Must be a folder or zip archive.
    # Required.
    path: ''
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
  uplaod-file:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Build web assets
        run: npm run build
      - name: Deploy Live Update
        uses: capawesome-team/cloud-live-update-action@v0.0.1
        id: upload-action
        with:
          appId: 'addb597c-9cbd-4cdc-bcc0-cd5c2234a03f'
          channel: 'production-1.0.0'
          path: 'dist'
          token: ${{ secrets.CAPAWESOME_TOKEN }}
```

## License

See [LICENSE](./LICENSE).
