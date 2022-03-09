const alert = require("./lib/cli-alerts");

module.exports = cli => {
  alert({ type: 'warning', msg: "DEBUGGING INFO" });
  console.log(cli.input);
  console.log(cli.flags);
  console.log();
};