// ****
// ****
// ****
// ****
function camelize(str: string) {
  return str.replace(/-(\w)/g, (_: any, c: string) => c ? c.toUpperCase() : '')
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd: { [x: string]: any; options: any[] }) {
  let args: any = {};
  cmd.options.forEach((o: { long: string }) => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}


import inquirer from 'inquirer';
/**
 * 弹出窗口让用户确认
 * @param msg 要确认的信息
 */
async function confirm(msg: string): Promise<boolean> {
  const { confirm } = await inquirer.prompt([
    {
      name: 'confirm',
      type: 'confirm',
      message: msg
    }
  ])
  return confirm;
}

// async function choice(msg: string, choices: { name: string, value: string }[]){

// }

export { cleanArgs, confirm }