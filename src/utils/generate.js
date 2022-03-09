const path = require("path");
const copy = require("copy-template-dir");
const { green: g, yellow: y, dim: d } = require("chalk");
const execa = require('execa');
const ora = require('ora');

const alert = require("./alerts");

const spinner = ora({ text: '' });
const questions = require("./hci/questions");

module.exports = async () => {
  const vars = await questions();

  const outDir = vars.name;
  const inDirPath = path.join(__dirname, "..", "..", "template");
  const outDirPath = path.join(process.cwd(), outDir);

  copy(inDirPath, outDirPath, vars, async (err, createdFiles) => {
    if (err) throw err;

    console.log(g(`\nCreating files in ./${d(outDir)} directory:\n`));

    createdFiles.forEach((filePath) => {
      const fileName = path.basename(filePath);
      console.log(`${g("CREATED")} ${fileName} ${g("FILE")}.`);
    });

    console.log();
    spinner.start(`${y("DEPENDENCIES")} install...\n\n${d("It may take moment...")}`)
    process.chdir(outDirPath);

    // 生成的项目需要的安装包配置
    const pkgs = [
      "chalk@4",
      "log-symbols@4",
      "cli-table3@0",
      "meow@7",
    ];
    // 执行安装命令
    await execa('npm', ["install", ...pkgs]);

    // 解决,重复依赖问题
    await execa("npm", ["dedupe"]);
    spinner.succeed(`${g("DEPENDENCIES")} installed!`);

    alert({
      type: "success",
      name: "ALL DONE!",
      msg: `\n\n${createdFiles.length} files created in ${d(
        `./${outDir}`
      )} directory.`,
    });
  });
};
