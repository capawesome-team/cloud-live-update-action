import * as core from '@actions/core'
import { exec } from './helpers/subprocess.mjs'

export const run = async () => {
  if (!process.env.CAPAWESOME_TOKEN) {
    core.setFailed('Environment variable CAPAWESOME_TOKEN is required.')
  }

  const appId = core.getInput('appId', {
    required: true
  })
  const path = core.getInput('path', {
    required: true
  })
  const channel = core.getInput('channel')

  if (channel) {
    await exec(
      `npx capawesome apps:bundles:create --appId ${appId} --path ${path} --channel ${channel}`
    )
  } else {
    await exec(
      `npx capawesome apps:bundles:create --appId ${appId} --path ${path}`
    )
  }
}
