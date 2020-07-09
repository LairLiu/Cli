"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var utils_1 = require("./utils");
var init_1 = require("./init");
commander_1.default
    .version('0.0.1', '-v --version')
    .usage('<command> [options]');
commander_1.default
    .command('init <app-name>')
    .description('初始化一个项目')
    .action(function (name, cmd) {
    console.log(cmd);
    var options = utils_1.cleanArgs(cmd);
    console.log(options);
    init_1.init(name, options);
});
// 解析命令
commander_1.default.parse(process.argv);
