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
  const loginResult = await util.promisify(child.exec)(
    `npx @capawesome/cli@1.4.0 login --token ${token}`
  )
  console.log(loginResult.stdout)
  console.error(loginResult.stderr)
  const whoami = await util.promisify(child.exec)(`npx @capawesome/cli@1.4.0 whoami`)
  console.log(whoami.stdout)
  console.error(whoami.stderr)
  // Create the channel
  if (channel) {
    try {
      await util.promisify(child.exec)(
        `npx @capawesome/cli@1.4.0 apps:channels:create --appId ${appId} --name ${channel}`
      )
    } catch {
      // No-op
    }
  }
  // Create the bundle
  const result = await util.promisify(child.exec)(
    `npx @capawesome/cli@1.4.0 apps:bundles:create --appId ${appId} --channel ${channel} --path ${path}`
  )
  console.log(result.stdout)
  console.error(result.stderr)
}
