"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatServer = void 0;
const socket_io_1 = require("socket.io");
class ChatServer {
    constructor(server) {
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: '*',
            }
        });
        this.run();
    }
    run() {
        this.io.on('connection', (socket) => {
            console.log('connected');
        });
    }
}
exports.ChatServer = ChatServer;
//# sourceMappingURL=ChatApp.js.map