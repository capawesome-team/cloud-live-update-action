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
  const result = await $`capawesome whoami`
  core.info(result.stdout)
}
