import * as util from 'util'
import * as child from 'child_process'

export const exec = async (command) => {
    const result = await util.promisify(child.exec)(command)
    return result.stdout || result.stderr
}