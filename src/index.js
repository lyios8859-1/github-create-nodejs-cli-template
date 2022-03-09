#!/usr/bin/env node

/**
 * step1: chmod +x index.js  设置该文件为可执行文件
 * setp2: npm link 到全局
 * setp3: 执行 package.json 中的 bin 字段中的命令
 */
const chalk = require("chalk");

const init = require("./utils/init");
const alert = require("./utils/alerts");
const cli = require('./utils/cli');

const { bio, ad, social, blog, blogName } = require("./utils/data");
const debug = require("./utils/debug");
const stats = require('./utils/stats');
const posts = require('./utils/posts');

const genterate = require('./utils/generate');

const input = cli.input; // 输入的 例如 help 这种的参数
const flags = cli.flags; // 输入的 例如 --no-ad  --debug 这种参数

!(async () => {
  init(flags.minimal, flags.clear);
  input.includes('help') && cli.showHelp(0);

  flags.bio && console.log(bio);
  flags.social && console.log(social);
  flags.ad && alert({ type: "info", msg: ad, name: "Ad." });

  flags.posts && alert({ type: 'info', msg: blog, name: blogName });
  // 请求文档帖子
  flags.posts && (await posts());

  // 请求 github, 获取统计数据
  flags.stats && await stats();

  flags.debug && debug(cli);

  await genterate();

})();
