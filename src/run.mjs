import * as core from '@actions/core'
import { $ } from 'zx'

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
  await $`capawesome login --token ${token}`
  // Create the channel
  if (channel) {
    try {
      await $`capawesome apps:channels:create --appId ${appId} --name ${channel}`
    } catch {
      // No-op
    }
  }
  // Create the bundle
  await $`capawesome apps:bundles:create --appId ${appId} --channel ${channel} --path ${path}`
}
