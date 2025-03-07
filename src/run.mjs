import * as core from '@actions/core'
import { exec } from './helpers/child-process.mjs'

export const run = async () => {
  const appId = core.getInput('appId', {
    required: true
  })
  const channel = core.getInput('channel')
  const commitMessage = core.getInput('commitMessage')
  const commitRef = core.getInput('commitRef')
  const commitSha = core.getInput('commitSha')
  const path = core.getInput('path', {
    required: true
  })
  const token = core.getInput('token', {
    required: true
  })

  // Install the CLI
  await exec('npm install -g @capawesome/cli@1.6.0')
  // Save the token
  await exec(`npx capawesome login --token ${token}`)
  // Create the channel
  if (channel) {
    try {
      await exec(
        `npx capawesome apps:channels:create \
          --appId ${appId} \
          --name ${channel}`
      )
    } catch {
      // No-op
    }
  }
  // Create the bundle
  const result = await exec(
    `npx capawesome apps:bundles:create \
    --appId ${appId} \
    --channel ${channel} \
    --path ${path} \
    ${commitMessage ? `--commit-message "${commitMessage}"` : ''} \
    ${commitRef ? `--commit-ref ${commitRef}` : ''} \
    ${commitSha ? `--commit-sha ${commitSha}` : ''}`
  )
  core.info(result)
}
