#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var create_1 = require("./create");
commander_1.default
    .version('0.0.1')
    .option('-v --version', '版本信息')
    .option('-h --help', '帮助')
    .option('-t --template <template>', '可供生成的模块')
    .option('-f --force', '强制生成')
    .usage('<command> [options]');
commander_1.default
    .command('create <app-name>').alias('i')
    .option('-t --template <template>', '可供生成的模块')
    .option('-f --force', '强制生成')
    .description('初始化一个项目')
    .action(function (name, cmd) {
    // const options = cleanArgs(cmd);
    create_1.create(name, commander_1.default);
});
// 解析命令
commander_1.default.parse(process.argv);
