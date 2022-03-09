const path = require('path');

const unhandled = require('./lib/cli-handle-unhandled');
const welcome = require('./lib/cli-welcome');
const checkNode = require("./lib/cli-check-node-version");

const pkg = require(path.resolve(__dirname, '../../package.json'));

module.exports = (clear) => {
  unhandled(); // 捕获未处理的异常

  welcome({
    title: 'create-nodejs-cli',
    tagLine: "by Timly.dev",
    description: pkg.description,
    version: pkg.version,
    bgColor: "#6cc24a",
    color: "#000000",
    bold: true,
    clear,
  });

  // fail 为 true 表示用户的 Node.js 小于这里设定的 16 就提示，升级 Node.js
  checkNode("16", { fail: true });
};