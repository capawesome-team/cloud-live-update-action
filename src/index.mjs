import * as core from '@actions/core'
import { run } from './run.mjs'

try {
  await run()
} catch (error) {
  core.setFailed(error)
}
