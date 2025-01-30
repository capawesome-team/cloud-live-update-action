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

  // Save the token
  await exec(`npx @capawesome/cli@1.4.0 login --token ${token}`)
  // Create the channel
  if (channel) {
    try {
      await exec(
        `npx @capawesome/cli@1.4.0 apps:channels:create --appId ${appId} --name ${channel}`
      )
    } catch {
      // No-op
    }
  }
  // Create the bundle
  const result = await exec(
    `npx @capawesome/cli@1.4.0 apps:bundles:create --appId ${appId} --channel ${channel} --path ${path}`
  )
  core.info(result)
}
