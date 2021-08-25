"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isServer() {
    return typeof window === "undefined";
}
exports.default = isServer;
