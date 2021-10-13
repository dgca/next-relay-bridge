"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __importDefault(require("next/router"));
function getRedirectCode(codeOrPermanent) {
    if (typeof codeOrPermanent === "boolean") {
        return codeOrPermanent ? 308 : 307;
    }
    return codeOrPermanent;
}
function redirect(_a, path, permanent) {
    var res = _a.res;
    if (permanent === void 0) { permanent = false; }
    if (res) {
        res.writeHead(getRedirectCode(permanent), {
            Location: path,
        });
        res.end();
    }
    else {
        router_1.default.replace(path);
    }
}
exports.default = redirect;
