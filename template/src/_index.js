#!/usr/bin/env node

/**
 * {{name}}
 * description: {{description}}
 * 
 * @author {{authorName}} <{{authorUrl}}>
 * @email {{authorEmail}}
 */

 const init = require("./utils/init");
 const cli = require('./utils/cli');
 const debug = require("./utils/debug");
 
 const input = cli.input; // 输入的 例如 help 这种的参数
 const flags = cli.flags; // 输入的 例如 --no-ad  --debug 这种参数
 
 !(async () => {
   init(flags.clear);
   input.includes('help') && cli.showHelp(0);

   flags.debug && debug(cli);
 })();
 