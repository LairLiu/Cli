#!/usr/bin/env node

import program from "commander";
import { cleanArgs } from "./utils/utils";
import { create } from './create';

program
  .version('0.0.1')
  .option('-v --version', '版本信息')
  .option('-h --help', '帮助')
  .option('-t --template <template>', '可供生成的模块')
  .option('-f --force', '强制生成')
  .usage('<command> [options]');


program
  .command('create <app-name>').alias('i')
  .option('-t --template <template>', '可供生成的模块')
  .option('-f --force', '强制生成')
  .description('初始化一个项目')
  .action((name, cmd) => {
    // const options = cleanArgs(cmd);
    create(name, program);
  })


// 解析命令
program.parse(process.argv)