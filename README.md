# @xurizaemon/hubot-farewell

This plugin permits Hubot to start and then exit after a configured delay, with a configurable exit message.

This is intended for use in CI, but might also be useful if you want to exit Hubot regularly and have it reload by some
parent process manager.

## Configuration

The environment variables for configuration are:

| Variable name          | Example value         | Description                         |
|------------------------|-----------------------|-------------------------------------|
| HUBOT_FAREWELL_ENABLED | true, false           | Defaults to false                   |
| HUBOT_FAREWELL_MESSAGE | Goodbye, cruel world! | What to say before exiting.         |
| HUBOT_FAREWELL_TARGET  | #general              | Where to say goodbye                |
| HUBOT_FAREWELL_TIMEOUT | 60000                 | Milliseconds between start and quit |

## Usage

To use this in CI, I include the module in the bot's default configuration via `external-scripts.json` (etc), but do not
set `HUBOT_FAREWELL_ENABLED`.

Then in CI I can set that variable (and the others), and run a CI task which confirms connectivity to the adapter in a
given state.

Since Hubot doesn't exit by default, this permits me to have Hubot pop up in a channel, confirm things are working by
saying hello with [@xurizaemon/hubot-startup](https://github.com/xurizaemon/hubot-startup), hang around for a few
minutes for people to poke, then exit successfully a short time later via this plugin.

## Support

![maintenance not intended](https://unmaintained.tech)

There is no commitment to maintaining this software. That said, PRs and issues are welcome!

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

## Contribution

Welcome!

## Links

* https://github.com/xurizaemon/hubot-farewell