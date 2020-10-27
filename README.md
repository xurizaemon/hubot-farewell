# Hubot Farewell

This plugin permits Hubot to start and then exit after a configured delay, with a configurable exit message.

This is intended for use in CI, but might also be useful if you want to exit Hubot regularly and have it reload by some parent process manager.

## Configuration

Configured via environment variables:

* `HUBOT_FAREWELL_ENABLED` Whether to exit. 
* `HUBOT_FAREWELL_MESSAGE` What to say before exiting.
* `HUBOT_FAREWELL_TARGET`  Where to say goodbye.
* `HUBOT_FAREWELL_TIMEOUT` Milliseconds before exiting.

## Usage

To use this in CI, I include the module in the bot's default configuration via `external-scripts.json` (etc), but do not set `HUBOT_FAREWELL_ENABLED`.

Then in CI I can set that variable (and the others), and run a CI task which confirms connectivity to the adapter in a given state.

Since Hubot doesn't exit by default, this permits me to have Hubot pop up in a channel, confirm things are working by saying hello with [hubot-startup](https://github.com/bouzuya/hubot-startup), hang around for a few minutes for people to poke, then exit successfully a short time later via this plugin.

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

## Contribution

Welcome!

## Links

* https://github.com/xurizaemon/hubot-farewell