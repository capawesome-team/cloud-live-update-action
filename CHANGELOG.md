# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.1.0](https://github.com/capawesome-team/cloud-live-update-action/compare/v0.0.7...v0.1.0) (2026-06-04)


### ⚠ BREAKING CHANGES

* The `commitMessage`, `commitRef` and `commitSha` inputs have
been removed. Use the `gitRef` input instead. See BREAKING.md for details.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>

* fix: escape and mask secrets line-by-line

Address PR review: `::add-mask::` requires escaping `%`/`\r` and only masks
a single line per command, so multi-line PEM private keys leaked into the log.
Add a dedicated "Mask secrets" step that masks each line individually with
proper escaping (add-mask is job-scoped, so it covers all subsequent steps).

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>

### Features

* rewrite as composite Bash action and update Capawesome CLI to 4.x ([#8](https://github.com/capawesome-team/cloud-live-update-action/issues/8)) ([37a9015](https://github.com/capawesome-team/cloud-live-update-action/commit/37a9015ec63a0dee70b1ba30f7de2581d6b1f469))

## [0.0.7](https://github.com/capawesome-team/cloud-live-update-action/compare/v0.0.6...v0.0.7) (2025-07-28)

## [0.0.6](https://github.com/capawesome-team/cloud-live-update-action/compare/v0.0.5...v0.0.6) (2025-06-06)


### Bug Fixes

* update CLI version to 1.13.1 ([5126ca1](https://github.com/capawesome-team/cloud-live-update-action/commit/5126ca17b49a90eafc344d227d7d8dd113f7dd7d)), closes [#7](https://github.com/capawesome-team/cloud-live-update-action/issues/7)

## [0.0.5](https://github.com/capawesome-team/cloud-live-update-action/compare/v0.0.4...v0.0.5) (2025-03-18)


### Bug Fixes

* update CLI version to 1.6.2 ([1109b0e](https://github.com/capawesome-team/cloud-live-update-action/commit/1109b0e8837546a5d3bed45b07415cad7ac45cbf))

## [0.0.4](https://github.com/capawesome-team/cloud-live-update-action/compare/v0.0.3...v0.0.4) (2025-03-08)


### Features

* enable git integration ([#5](https://github.com/capawesome-team/cloud-live-update-action/issues/5)) ([623d3eb](https://github.com/capawesome-team/cloud-live-update-action/commit/623d3eb0265c04bccdb500c58070adca8127f7f6))


### Bug Fixes

* improve error handling ([#6](https://github.com/capawesome-team/cloud-live-update-action/issues/6)) ([0ab4a36](https://github.com/capawesome-team/cloud-live-update-action/commit/0ab4a36f6e10f8dbf218abe7b6fd08ce458a30cc))

## [0.0.3](https://github.com/capawesome-team/cloud-live-update-action/compare/v0.0.2...v0.0.3) (2025-01-30)


### Bug Fixes

* update Capawesome CLI to 1.4.0 ([112d953](https://github.com/capawesome-team/cloud-live-update-action/commit/112d953e71ca2e9ad1ee173c8850893d074add3d))

## [0.0.2](https://github.com/capawesome-team/cloud-live-update-action/compare/v0.0.1...v0.0.2) (2024-04-30)

## 0.0.1 (2024-04-30)

Initial release 🎉
