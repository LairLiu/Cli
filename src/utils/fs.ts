import fs from "fs-extra";
import ora from 'ora';

/**
 * @description 复制文件
 * @param {string} input 文件源地址
 * @param {string} output 文件存储地址
 */
async function copyFile(input: string, output: string) {
  const oraCopy = ora({ color: 'red', text: '文件复制中' });
  oraCopy.start('开始复制=>' + input);
  await fs.copySync(input, output);
  oraCopy.succeed('复制完成=>' + output);
}

/**文件操作 */
export { copyFile }