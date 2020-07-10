import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import Config from './ddd.config.json';
import { confirm } from './utils/utils';
// import downloadGtiRpo from 'download-git-repo';
const downloadGtiRpo = require("download-git-repo");

// 创建项目
/*
  根据传入的地址，创建一个新项目
  在创建时会允许选择要添加的模块
 */

export async function create(appname: string, options: any) {

  const cwd = options.cwd || process.cwd();
  const inCurrent = appname === '.'; //是否在当前文件夹创建
  const targetDir = path.resolve(cwd, inCurrent ? '.' : appname); //项目地址
  if (path.resolve(__dirname, '../') == targetDir) {
    return console.log(chalk.red('不能在cli目录内生成项目'));
  }

  // ************** 确定模板

  const templateType = await choiceTemplate(options.template);


  // ************** 确认存放项目的文件夹

  let exists = await fs.existsSync(targetDir);
  if (exists && !options.force) { //目录不存在或者强制覆盖
    const step1 = await confirm(`目录[ ${targetDir} ]已存在，依旧在此执行？`);
    if (!step1) return;
    const step2 = await confirm('将清空目录下所有文件再重新创建，确定？');
    if (!step2) return;

    let clean = ora('清空目录').start();
    await fs.emptyDirSync(targetDir);
    clean.succeed('清空目录')
  }

  // ************** 开始copy项目

  await downloadTemplate(templateType, targetDir);
}

/**
 * 传入模板类型，自动加载生成
 * @param {string} type 模板类型
 * @param {string} targetDir 要输出的地址
 * @param {'git'|'global'} from 模板地址来源
 */
async function downloadTemplate(type: string, targetDir: string, from: 'git' | 'global' = 'git') {
  // const templatePath = path.resolve(Config.template);
  const gitPath = Config.template[type].git, globalPath = Config.template[type].golbal;
  // 都不存在
  if (from == 'git') {
    if (!gitPath || gitPath == "") return ora().fail(`${type} 找不到git地址`);
    const spinner = ora('正在从git上下载文件').start();
    downloadGtiRpo('direct:' + gitPath, targetDir, { clone: true }, function (error: any) {
      if (error) {
        spinner.fail('下载失败>> ' + gitPath);
        console.error(error);
      } else {
        spinner.succeed('下载成功');
      }
    })
  }
  else {
    if (!globalPath || globalPath == "") return ora().fail(`${type} 找不到global地址`);
    const spinner = ora('正在从global上下载文件').start();
    const result = await fs.existsSync(globalPath);
    if (result == false) {
      spinner.fail('下载失败,不存在目录>> ' + gitPath);
    }
    await fs.copySync(globalPath, targetDir);
    spinner.succeed('下载成功');
  }
}

/**
 * 传入模板名称，返回模板类型
 * @param {string} templateType 模板类型
 */
async function choiceTemplate(templateType: any) {
  const template = Config.template[templateType];
  if (templateType || template) {
    ora().warn('模板<' + templateType + '>不存在');
  }
  templateType = await changeTemplate();
  return templateType;
}


/**
 * 选择要生成的模板 
 */
async function changeTemplate(): Promise<string> {
  // 根据配置文件获取可供选择的列表
  const keys = Object.keys(Config.template);
  let choiceArr: { name: string; value: string; }[] = [];
  keys.forEach(item => {
    choiceArr.push({ name: item, value: item });
  })

  const { template } =
    await inquirer.prompt([{
      name: 'template',
      type: 'list',
      message: '手动选择要创建的项目类型',
      choices: choiceArr
    }]);

  return template;
}