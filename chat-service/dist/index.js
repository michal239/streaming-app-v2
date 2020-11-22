"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatServer_1 = require("./ChatServer");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const server = app.listen(5000);
new ChatServer_1.ChatServer(server);
//# sourceMappingURL=index.js.map