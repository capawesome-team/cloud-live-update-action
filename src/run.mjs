import * as core from '@actions/core'
import * as util from 'util'
import * as child from 'child_process'

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
  await util.promisify(child.exec)(`capawesome login --token ${token}`)
  // Create the channel
  if (channel) {
    try {
      await util.promisify(child.exec)(
        `capawesome apps:channels:create --appId ${appId} --name ${channel}`
      )
    } catch {
      // No-op
    }
  }
  // Create the bundle
  const result = await util.promisify(child.exec)(
    `capawesome apps:bundles:create --appId ${appId} --channel ${channel} --path ${path}`
  )
  core.info(result.stdout)
}
