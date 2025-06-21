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
//   HUBOT_FAREWELL_TIMEIN How long before exiting to say bye.

export default (robot) => {
  const message = process.env.HUBOT_FAREWELL_MESSAGE || 'Farewell!'
  const timeout = process.env.HUBOT_FAREWELL_TIMEOUT || 60000
  const timein = process.env.HUBOT_FAREWELL_TIMEIN || 5000
  const target = process.env.HUBOT_FAREWELL_TARGET || ''
  const enabled = process.env.HUBOT_FAREWELL_ENABLED || false
  const envelope = { room: target }

  console.log(`Will exit after ${timeout} ms.`)
  if (enabled) {
    robot.logger.info(`Will exit after ${timeout} ms, messaging ${target}.`)
    // If the message is blank, we can exit silently.
    setTimeout(() => {
      try {
        robot.send(envelope, message)
      } catch (e) {
        robot.logger.info(`Unable to send message to ${target}.`)
      }
    }, timeout - timein)
    setTimeout(() => {
      robot.logger.info(`Exiting after ${timeout} ms.`)
      return process.exit(0)
    }, timeout)
  }
}
