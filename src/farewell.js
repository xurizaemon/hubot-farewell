// Description:
//   Say goodby and terminate nicely. For CI.
//
// I wanted to be able to start Hubot in CI, have it run for a short time,
// then exit nicely. This plugin does that.
//
// Configuration:
//   HUBOT_FAREWELL_ENABLED Whether to exit. 
//   HUBOT_FAREWELL_MESSAGE What to say before exiting.
//   HUBOT_FAREWELL_TARGET  Where to say goodbye.
//   HUBOT_FAREWELL_TIMEOUT Milliseconds before exiting.
module.exports = (robot) => {
    const message = process.env['HUBOT_FAREWELL_MESSAGE'] || 'Farewell!',
      timeout = process.env['HUBOT_FAREWELL_TIMEOUT'] || 60000,
      target = process.env['HUBOT_FAREWELL_TARGET'] || '',
      enabled = process.env['HUBOT_FAREWELL_ENABLED'] || false;
    if (enabled) {
        robot.logger.info(`Will exit after ${timeout} ms.`)
        setTimeout(() => {
            robot.messageRoom(target, message);
        }, timeout - 2000);
        setTimeout(() => {
            robot.logger.info(`Exiting after ${timeout} ms.`)
            return process.exit(0);
        }, timeout);    
    }
};
