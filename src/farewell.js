// Description:
//   Say farewell and terminate nicely. For CI.
//
// I wanted to be able to start Hubot in CI, have it run for a short time,
// then exit nicely. This plugin does that.
//
// Configuration:
//   HUBOT_FAREWELL_ENABLED Whether to exit.
//   HUBOT_FAREWELL_MESSAGE What to say before exiting.
//   HUBOT_FAREWELL_TARGET  Where to say goodbye.
//   HUBOT_FAREWELL_TIMEOUT Milliseconds before exiting.

export default (robot) => {
  const message = process.env.HUBOT_FAREWELL_MESSAGE || 'Farewell!'
  const timeout = process.env.HUBOT_FAREWELL_TIMEOUT || 60000
  const target = process.env.HUBOT_FAREWELL_TARGET || ''
  const enabled = process.env.HUBOT_FAREWELL_ENABLED || false
  const envelope = { room: target }

  console.log(`Will exit after ${timeout} ms.`)
  if (enabled) {
    robot.logger.info(`Will exit after ${timeout} ms, messaging ${target}.`)
    setTimeout(() => {
      try {
        robot.send(envelope, message)
      } catch (e) {
        robot.logger.info(`Unable to send message to ${target}.`)
      }
    }, timeout - 2000)
    setTimeout(() => {
      robot.logger.info(`Exiting after ${timeout} ms.`)
      return process.exit(0)
    }, timeout)
  }
}
