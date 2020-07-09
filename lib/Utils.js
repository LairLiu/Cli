"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ****
// ****
// ****
// ****
function camelize(str) {
    return str.replace(/-(\w)/g, function (_, c) { return c ? c.toUpperCase() : ''; });
}
// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
    var args = {};
    cmd.options.forEach(function (o) {
        var key = camelize(o.long.replace(/^--/, ''));
        // if an option is not present and Command has a method with the same name
        // it should not be copied
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key];
        }
    });
    return args;
}
exports.cleanArgs = cleanArgs;
