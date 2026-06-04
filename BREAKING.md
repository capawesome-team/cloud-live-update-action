# Breaking Changes

This is a comprehensive list of the breaking changes introduced in the major version releases.

## Versions

- [Version 0.1.x](#version-01x)

## Version 0.1.x

### Removed Commit Inputs

The `commitMessage`, `commitRef` and `commitSha` inputs have been removed. Use the `gitRef` input instead to associate the bundle with a Git reference (branch, tag, or commit SHA).

```diff
  - uses: capawesome-team/cloud-live-update-action@v0.1.0
    with:
      appId: ''
      path: ''
      token: ''
-     commitMessage: ${{ github.event.head_commit.message }}
-     commitRef: ${{ github.head_ref || github.ref_name }}
-     commitSha: ${{ github.sha }}
+     gitRef: ${{ github.sha }}
```

### Updated Capawesome CLI

The action now uses Capawesome CLI `4.x.x` and deploys live updates via the `apps:liveupdates:upload` command instead of the deprecated `apps:bundles:create` command. See the [Capawesome CLI breaking changes](https://github.com/capawesome-team/cli/blob/main/BREAKING.md) for more details.
