import * as core from '@actions/core'
import axios from 'axios'
import FormData from 'form-data'
import { createReadStream } from 'node:fs'
import { isZipped, zipFolder } from './helpers/zip.mjs'
import { AxiosError } from 'axios'

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

  // Create form data
  const formData = new FormData()
  if (isZipped(path)) {
    formData.append('file', createReadStream(path))
  } else {
    core.info('Zipping folder...')
    const zipBuffer = await zipFolder(path)
    formData.append('file', zipBuffer, { filename: 'bundle.zip' })
  }
  if (channel) {
    formData.append('channelName', channel)
  }
  // Upload the bundle
  core.info('Uploading...')
  try {
    const response = await axios.post(
      `https://api.cloud.capawesome.io/v1/apps/${appId}/bundles`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    core.info('Bundle successfully created.')
    core.info(`Bundle ID: ${response.data.id}`)
  } catch (error) {
    if (error instanceof AxiosError) {
      core.setFailed(error.response?.data?.message)
    } else {
      core.setFailed('Failed to create bundle.')
    }
  }
}
