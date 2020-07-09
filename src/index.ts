import program from "commander";
import { cleanArgs } from "./utils";
import { init } from './init';
import { cwd } from "process";

program
  .version('0.0.1', '-v --version')
  .usage('<command> [options]')


program
  .command('init <app-name>')
  .description('初始化一个项目')
  .action((name, cmd) => {
    console.log(cmd);
    
    const options = cleanArgs(cmd);
    console.log(options);
    init(name, options);
  })


// 解析命令

program.parse(process.argv)