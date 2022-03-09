const boxen = require('boxen');

const unhandled = require('./lib/cli-handle-unhandled');
const welcome = require('./lib/cli-welcome');
const checkNode = require("./lib/cli-check-node-version");

const pkg = require('../../package.json');

module.exports = (minimal, clear) => {
  unhandled(); // 捕获未处理的异常

  !minimal && welcome({
    title: 'create-nodejs-cli',
    tagLine: "by Timly.dev",
    description: pkg.description,
    version: pkg.version,
    bgColor: "#6cc24a",
    color: "#000000",
    bold: true,
    clear,
  });

  minimal && console.log(boxen("Timly", { padding: 1, margin: 1, borderStyle: 'double', float: 'center', backgroundColor: 'magenta', dimBorder: true }));

  // fail 为 true 表示用户的 Node.js 小于这里设定的 16 就提示，升级 Node.js
  checkNode("16", { fail: true });
};