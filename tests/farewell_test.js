import { describe, it, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import farewellScript from '../src/farewell.js'

describe('hubot-farewell', () => {
  let robot
  let loggedMessages

  beforeEach(() => {
    // Disable HTTP server for test.
    process.env.EXPRESS_PORT = 'disabled'
    process.env.PORT = 'disabled'

    loggedMessages = []
    robot = {
      logger: {
        info: (msg) => loggedMessages.push(['info', msg]),
        warn: (msg) => loggedMessages.push(['warn', msg]),
        error: (msg) => loggedMessages.push(['error', msg])
      },
      respond: () => {
      },
      shutdown: () => {
      }
    }
  })

  afterEach(async () => {
    if (robot?.server?.close) {
      await new Promise(resolve => robot.server.close(resolve))
    }
    if (robot) {
      await robot.shutdown()
    }
    delete process.env.HUBOT_STARTUP_ROOM
    delete process.env.HUBOT_STARTUP_MESSAGE
    delete process.env.EXPRESS_PORT
    delete process.env.PORT
  })

  it('should log the timeout message', () => {
    process.env.HUBOT_FAREWELL_ENABLED = true
    process.env.HUBOT_FAREWELL_TIMEOUT = 5000
    farewellScript(robot)

    const hasTimeoutMessage = loggedMessages.some(([level, msg]) =>
      level === 'info' && msg.match(/Will exit after \d+ ms\./)
    )
    assert(hasTimeoutMessage, 'Expected timeout message was not logged')
  })
})
