import * as core from '@actions/core'
import { exec } from './helpers/child-process.mjs'

export const run = async () => {
  const appId = core.getInput('appId', {
    required: true
  })
  const channel = core.getInput('channel')
  const path = core.getInput('path', {
    required: true
  })
  const token = core.getInput('token', {
    required: true
  })

  // Install the CLI
  await exec('npm install -g @capawesome/cli@1.4.0-dev.62a72e4.1741443452')
  // Save the token
  await exec(`npx capawesome login --token ${token}`)
  // Create the channel
  if (channel) {
    try {
      await exec(
        `npx capawesome apps:channels:create --appId ${appId} --name ${channel}`
      )
    } catch {
      // No-op
    }
  }
  // Create the bundle
  const result = await exec(
    `npx capawesome apps:bundles:create --appId ${appId} --channel ${channel} --path ${path}`
  )
  core.info(result)
}
