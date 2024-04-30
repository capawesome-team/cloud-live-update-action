# cloud-live-update-action

GitHub Action to deploy a Capacitor Live Update to the [Capawesome Cloud](https://capawesome.io/cloud/).

## Usage

```yaml
- uses: robingenz/action-firebase-cloud-storage-upload@v1.0.0
  with:
    # The Capawesome Cloud app ID.
    # Required.
    appId: ''
    # The path to the bundle to upload. Must be a folder or zip archive.
    # Required.
    path: ''
    # The channel to deploy the update to.
    channel: ''
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
          path: 'dist'
          channel: 'production-1.0.0'
        env:
          CAPAWESOME_TOKEN: ${{ secrets.CAPAWESOME_TOKEN }}
```

## License

See [LICENSE](./LICENSE).

[^1]: This project is not affiliated with, endorsed by, sponsored by, or approved by Google LLC or any of their affiliates or subsidiaries. 
