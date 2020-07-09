"use strict";
// 创建项目
/*
  根据传入的地址，创建一个新项目
  在创建时会允许选择要添加的模块
 */
Object.defineProperty(exports, "__esModule", { value: true });
function init() {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    console.log(arg);
}
exports.init = init;
