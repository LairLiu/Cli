"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = __importDefault(require("inquirer"));
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var chalk_1 = __importDefault(require("chalk"));
var ora_1 = __importDefault(require("ora"));
var ddd_config_json_1 = __importDefault(require("./ddd.config.json"));
var utils_1 = require("./utils/utils");
// import downloadGtiRpo from 'download-git-repo';
var downloadGtiRpo = require("download-git-repo");
// 创建项目
/*
  根据传入的地址，创建一个新项目
  在创建时会允许选择要添加的模块
 */
function create(appname, options) {
    return __awaiter(this, void 0, void 0, function () {
        var cwd, inCurrent, targetDir, templateType, exists, step1, step2, clean;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cwd = options.cwd || process.cwd();
                    inCurrent = appname === '.';
                    targetDir = path_1.default.resolve(cwd, inCurrent ? '.' : appname);
                    if (path_1.default.resolve(__dirname, '../') == targetDir) {
                        return [2 /*return*/, console.log(chalk_1.default.red('不能在cli目录内生成项目'))];
                    }
                    return [4 /*yield*/, choiceTemplate(options.template)];
                case 1:
                    templateType = _a.sent();
                    return [4 /*yield*/, fs_extra_1.default.existsSync(targetDir)];
                case 2:
                    exists = _a.sent();
                    if (!(exists && !options.force)) return [3 /*break*/, 6];
                    return [4 /*yield*/, utils_1.confirm("\u76EE\u5F55[ " + targetDir + " ]\u5DF2\u5B58\u5728\uFF0C\u4F9D\u65E7\u5728\u6B64\u6267\u884C\uFF1F")];
                case 3:
                    step1 = _a.sent();
                    if (!step1)
                        return [2 /*return*/];
                    return [4 /*yield*/, utils_1.confirm('将清空目录下所有文件再重新创建，确定？')];
                case 4:
                    step2 = _a.sent();
                    if (!step2)
                        return [2 /*return*/];
                    clean = ora_1.default('清空目录').start();
                    return [4 /*yield*/, fs_extra_1.default.emptyDirSync(targetDir)];
                case 5:
                    _a.sent();
                    clean.succeed('清空目录');
                    _a.label = 6;
                case 6: 
                // ************** 开始copy项目
                return [4 /*yield*/, downloadTemplate(templateType, targetDir)];
                case 7:
                    // ************** 开始copy项目
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
/**
 * 传入模板类型，自动加载生成
 * @param {string} type 模板类型
 * @param {string} targetDir 要输出的地址
 * @param {'git'|'global'} from 模板地址来源
 */
function downloadTemplate(type, targetDir, from) {
    if (from === void 0) { from = 'git'; }
    return __awaiter(this, void 0, void 0, function () {
        var gitPath, globalPath, spinner_1, spinner, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gitPath = ddd_config_json_1.default.template[type].git, globalPath = ddd_config_json_1.default.template[type].golbal;
                    if (!(from == 'git')) return [3 /*break*/, 1];
                    if (!gitPath || gitPath == "")
                        return [2 /*return*/, ora_1.default().fail(type + " \u627E\u4E0D\u5230git\u5730\u5740")];
                    spinner_1 = ora_1.default('正在从git上下载文件').start();
                    downloadGtiRpo('direct:' + gitPath, targetDir, { clone: true }, function (error) {
                        if (error) {
                            spinner_1.fail('下载失败>> ' + gitPath);
                            console.error(error);
                        }
                        else {
                            spinner_1.succeed('下载成功');
                        }
                    });
                    return [3 /*break*/, 4];
                case 1:
                    if (!globalPath || globalPath == "")
                        return [2 /*return*/, ora_1.default().fail(type + " \u627E\u4E0D\u5230global\u5730\u5740")];
                    spinner = ora_1.default('正在从global上下载文件').start();
                    return [4 /*yield*/, fs_extra_1.default.existsSync(globalPath)];
                case 2:
                    result = _a.sent();
                    if (result == false) {
                        spinner.fail('下载失败,不存在目录>> ' + gitPath);
                    }
                    return [4 /*yield*/, fs_extra_1.default.copySync(globalPath, targetDir)];
                case 3:
                    _a.sent();
                    spinner.succeed('下载成功');
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * 传入模板名称，返回模板类型
 * @param {string} templateType 模板类型
 */
function choiceTemplate(templateType) {
    return __awaiter(this, void 0, void 0, function () {
        var template;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    template = ddd_config_json_1.default.template[templateType];
                    if (templateType || template) {
                        ora_1.default().warn('模板<' + templateType + '>不存在');
                    }
                    return [4 /*yield*/, changeTemplate()];
                case 1:
                    templateType = _a.sent();
                    return [2 /*return*/, templateType];
            }
        });
    });
}
/**
 * 选择要生成的模板
 */
function changeTemplate() {
    return __awaiter(this, void 0, void 0, function () {
        var keys, choiceArr, template;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    keys = Object.keys(ddd_config_json_1.default.template);
                    choiceArr = [];
                    keys.forEach(function (item) {
                        choiceArr.push({ name: item, value: item });
                    });
                    return [4 /*yield*/, inquirer_1.default.prompt([{
                                name: 'template',
                                type: 'list',
                                message: '手动选择要创建的项目类型',
                                choices: choiceArr
                            }])];
                case 1:
                    template = (_a.sent()).template;
                    return [2 /*return*/, template];
            }
        });
    });
}
