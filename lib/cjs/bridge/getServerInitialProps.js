"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var react_relay_1 = require("react-relay");
var makeRawQuery_1 = __importDefault(require("../utils/makeRawQuery"));
var redirect_1 = __importDefault(require("../utils/redirect"));
function awaitQuery(query) {
    return new Promise(function (resolve, reject) {
        var _a;
        if (!((_a = query === null || query === void 0 ? void 0 : query.source) === null || _a === void 0 ? void 0 : _a.subscribe)) {
            return;
        }
        query.source.subscribe({
            complete: resolve,
            error: reject,
        });
    });
}
var getServerInitialProps = function getServerInitialProps(_a) {
    var _b;
    var context = _a.context, userGetInitialProps = _a.userGetInitialProps, getServerEnvironment = _a.getServerEnvironment;
    return __awaiter(this, void 0, void 0, function () {
        function preloadQuery(query, variables) {
            return __awaiter(this, void 0, void 0, function () {
                var loadedQuery;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            loadedQuery = react_relay_1.loadQuery(relayEnvironment, query, variables);
                            return [4 /*yield*/, awaitQuery(loadedQuery)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, makeRawQuery_1.default(query, variables, loadedQuery)];
                    }
                });
            });
        }
        var relayEnvironment, initialProps, destination, permanent, serializedStore;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    relayEnvironment = getServerEnvironment();
                    return [4 /*yield*/, userGetInitialProps({
                            context: context,
                            preloadQuery: preloadQuery,
                        })];
                case 1:
                    initialProps = _c.sent();
                    if ((_b = initialProps.redirect) === null || _b === void 0 ? void 0 : _b.destination) {
                        destination = initialProps.redirect.destination;
                        permanent = !!initialProps.redirect.permanent;
                        redirect_1.default(context, destination, permanent);
                        return [2 /*return*/, {}];
                    }
                    serializedStore = (relayEnvironment === null || relayEnvironment === void 0 ? void 0 : relayEnvironment.getStore().getSource().toJSON()) || null;
                    return [2 /*return*/, __assign(__assign({}, initialProps), { __nextRelayBridgeProps__: {
                                initialStore: serializedStore,
                                relayEnvironment: relayEnvironment,
                            } })];
            }
        });
    });
};
exports.default = getServerInitialProps;
