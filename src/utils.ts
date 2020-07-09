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


export { cleanArgs }