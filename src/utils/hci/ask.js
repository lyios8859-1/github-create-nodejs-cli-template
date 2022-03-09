const fs = require("fs");
const path = require("path");
const { Input } = require("enquirer");
const to = require("await-to-js").default;
const { Store } = require("data-store");

const handleError = require("../lib/cli-handle-error");
const shouldCancel = require("../lib/cli-should-cancel");

module.exports = async ({ name, message, hint, initial }) => {
  let history = false;

  if (
    !initial &&
    name !== "name" &&
    name !== "command" &&
    name !== "description"
  ) {
    history = {
      store: new Store({
        path: path.join(__dirname, `../.history/${name}.json`)
      }),
      autosave: true
    };
  }

  const [err, response] = await to(
    new Input({
      name,
      message,
      hint,
      initial,
      history, // 存放曾经存在的输入，可以提示是否再次使用
      validate(value, state) {
        if (state && state.name === "command") return true;
        if (state && state.name === "name") {
          if (fs.existsSync(value)) {
            return `Directory already exists: ./${value}`;
          } else {
            return true;
          }
        }

        // 没有输入时候提示要输入
        return !value ? "Please input a value" : true;
      }
    })
      // .on("cancel", () => process.exit(1)) // Ctrl + C 退出控制台时，不继续下面的操作，中断
      .on("cancel", () => shouldCancel()) // Ctrl + C 退出控制台时， 友好的提示：不继续下面的操作，中断
      .run()
  );

  handleError("INPUT", err);

  return response;
};
