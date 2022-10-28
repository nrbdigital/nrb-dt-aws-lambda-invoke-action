/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import * as core from '@actions/core'
import {InvokeCommand, LambdaClient, LogType} from '@aws-sdk/client-lambda'
import fs from 'fs'

async function run(): Promise<void> {
  try {
    const functionName = core.getInput('function-name', {required: true})
    const payloadFile = core.getInput('payload-file')
    // const functionName = 'spring-batch-management'
    // const payloadFile = '/home/onurb/workspace/tmp/generator/ethias-oi-testgenerator2-batch/src/config/batch-dev.json'
    const payload = core.getInput('payload')
    let region = core.getInput('region')
    if (region === '') region = 'eu-west-1'

    let requestPayload: Uint8Array
    if (payloadFile !== '') {
      requestPayload = fs.readFileSync(payloadFile)
    } else {
      requestPayload = Buffer.from(payload)
    }

    // const requestPayload = fs.readFileSync(payloadFile)

    const client = new LambdaClient({region})

    const command = new InvokeCommand({
      FunctionName: functionName,
      Payload: requestPayload,
      LogType: LogType.Tail,
    })

    const {Payload, LogResult} = await client.send(command)
    let resultPayload: string
    let logs: string
    if (LogResult) {
      logs = Buffer.from(LogResult, 'base64').toString()
      console.log(logs)
    }
    if (Payload) {
      resultPayload = Buffer.from(Payload).toString()
      console.log('Result: ', resultPayload)
      const result: any = JSON.parse(resultPayload)
      if (result.errorType) {
        throw new Error(`Lambda invocation failed: ${result.errorMessage}`)
      }
    }

    // core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
