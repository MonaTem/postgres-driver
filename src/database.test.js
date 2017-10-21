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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var database_1 = require("./database");
var database = new database_1.Database("postgres://jakob:Gailbach@localhost:5432/postgres_driver");
describe("testing database.ts", function () {
    it("should create a tuple without any errors", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.createResource("users", { id: 0, name: "foo bar", verified: false })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, database.createResource("users", { id: 1, name: "bar baz", verified: false })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should find inserted tuple without any errors", function () { return __awaiter(_this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database
                        .readResource("users", { id: 0 })];
                case 1:
                    user = _a.sent();
                    assert.equal(user.id, 0);
                    assert.equal(user.name, "foo bar");
                    assert.equal(user.verified, false);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should find inserted tuples as list without any errors", function () { return __awaiter(_this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database
                        .readResourceList("users", { verified: false })];
                case 1:
                    users = _a.sent();
                    assert.equal(users.length, 2);
                    assert.equal(users[0].id, 0);
                    assert.equal(users[0].name, "foo bar");
                    assert.equal(users[0].verified, false);
                    assert.equal(users[1].id, 1);
                    assert.equal(users[1].name, "bar baz");
                    assert.equal(users[1].verified, false);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should order results", function () { return __awaiter(_this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database
                        .readResourceList("users", { verified: false }, "*", 0, 10, "", "id")];
                case 1:
                    users = _a.sent();
                    assert.equal(users.length, 2);
                    assert.equal(users[0].id, 1);
                    assert.equal(users[1].id, 0);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should update tuple without any errors", function () { return __awaiter(_this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.updateResource("users", { verified: true }, { id: 0 })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, database.readResource("users", { id: 0 })];
                case 2:
                    user = _a.sent();
                    assert.equal(user.verified, true);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should delete single tuple without any errors", function () { return __awaiter(_this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.deleteResource("users", { id: 1 })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, database.readResource("users", { id: 1 })];
                case 2:
                    user = _a.sent();
                    assert.equal(user, null);
                    return [2 /*return*/];
            }
        });
    }); });
    after(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.deleteResource("users", { id: 0 })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
